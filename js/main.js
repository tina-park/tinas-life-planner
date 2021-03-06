/* global easydropdown */

easydropdown.all();

var minWidth = window.matchMedia('(min-width: 1280px)');
var $headerMobile = document.querySelector('#header-mobile');
var $headerDesktop = document.querySelector('#header-desktop');
var $selectList = document.querySelectorAll('select');
var $imgWheel = document.querySelector('#imgWheel');
var $addVB = document.querySelector('#addVB');
var $cancel = document.querySelector('#cancel');
var $delete = document.querySelector('#delete');
var $popUpContainer = document.querySelector('.popUpContainer');
var $listView = document.querySelectorAll('.view');
var $listNavDesktop = document.querySelectorAll('.navDesktop');
var $listNavMobile = document.querySelectorAll('.navMobile');
var $containerNavDesktop = document.querySelector('#containerNavDesktop');
var $imgPopUp = document.querySelector('.imgPopUp');
var $formEntryVB = document.querySelector('#formEntryVB');
var $photoUrl = document.querySelector('#photoUrl');
var $rowVB = document.querySelector('#rowVB');
var $navSelect = document.querySelector('#navSelect');
var $spin = document.querySelector('#spin');

var dataWheel = {
  career: 10,
  finance: 10,
  health: 10,
  social: 10,
  family: 10,
  love: 10,
  recreation: 10,
  contribution: 10,
  spirituality: 10,
  selfImage: 10
};

var dataVB = {
  entries: [],
  editing: null,
  nextEntryId: 1,
  view: 'wheel-of-life'
};

window.addEventListener('load', hideSpin);
window.addEventListener('beforeunload', showSpin);
window.addEventListener('beforeunload', doDataJSON);
window.addEventListener('resize', swapHeaders);
window.addEventListener('DOMContentLoaded', handleLoad);
$addVB.addEventListener('click', handleAdd);
$cancel.addEventListener('click', closePopUp);
$containerNavDesktop.addEventListener('click', doSwapDV);
$photoUrl.addEventListener('input', updatePhotoUrl);
$formEntryVB.addEventListener('submit', handleSubmit);
$rowVB.addEventListener('click', handleEdit);
$delete.addEventListener('click', handleDelete);
$navSelect.addEventListener('change', handleNavSelect);

function hideSpin(event) {
  $spin.className = 'notVisible';
}

function showSpin(event) {
  $spin.className = '';
}

function doDataJSON(event) {
  var dataWheelJSON = JSON.stringify(dataWheel);
  localStorage.setItem('dataWheel', dataWheelJSON);
  var dataVBJSON = JSON.stringify(dataVB);
  localStorage.setItem('dataVB', dataVBJSON);
}

var previousDataWheelJSON = localStorage.getItem('dataWheel');
var previousDataVBJSON = localStorage.getItem('dataVB');

if (previousDataWheelJSON !== null) {
  dataWheel = JSON.parse(previousDataWheelJSON);
}
if (previousDataVBJSON !== null) {
  dataVB = JSON.parse(previousDataVBJSON);
}
updateWheelUrl();

for (var $select of $selectList) {
  $select.addEventListener('change', updateWheel);
}

function updateWheel(event) {
  var x = event.target.getAttribute('id');
  dataWheel[x] = event.target.value;
  updateWheelUrl();
}

function updateWheelUrl() {
  var newUrl = 'https://image-charts.com/chart?chco=FF9797%7CFFC997%7CF3E078%7CA0E845%7C7BE8F6%7C63BDFF%7CC3B9FF%7CCA90DE%7CFFCAF0%7CEA9BD4&chd=t%3A' +
  dataWheel.career + '%2C' +
  dataWheel.finance + '%2C' +
  dataWheel.health + '%2C' +
  dataWheel.social + '%2C' +
  dataWheel.family + '%2C' +
  dataWheel.love + '%2C' +
  dataWheel.recreation + '%2C' +
  dataWheel.contribution + '%2C' +
  dataWheel.spirituality + '%2C' +
  dataWheel.selfImage +
  '&chl=Career%7CFinance%7CHealth%7CSocial%7CFamily%7CLove%7CRecreation%7CContribution%7CSpirituality%7CSelf-Image&chlps=font.size%2C10.5%7Cpadding.right%2C10&chs=350x350&cht=pa&chxt=x%2Cy';
  $imgWheel.setAttribute('src', newUrl);
}
swapHeaders();

function swapHeaders(event) {
  if (minWidth.matches) {
    $headerMobile.className = 'hidden';
    $headerDesktop.className = '';
  } else {
    $headerMobile.className = '';
    $headerDesktop.className = 'hidden';
  }
}

function handleAdd(event) {
  $delete.className = 'popButton notVisible';
  openPopUp();
}

function openPopUp(event) {
  $popUpContainer.className = 'popUpContainer row justify-center align-center';
}

function closePopUp(event) {
  $formEntryVB.reset();
  $imgPopUp.setAttribute('src', 'images/placeholder.jpeg');
  $popUpContainer.className = 'popUpContainer row justify-center align-center hidden';
}

function swapDV(viewActive) {
  for (var i = 0; i < $listView.length; i++) {
    if ($listView[i].getAttribute('data-view') === viewActive) {
      $listView[i].className = 'view padding-page';
    } else {
      $listView[i].className = 'view padding-page hidden';
    }
  }
}

function doSwapDV(event) {
  if (event.target.tagName === 'BUTTON') {
    var $dataView = event.target.getAttribute('data-view');
    var $id = event.target.getAttribute('id');
    swapDV($dataView);
    doActiveDesktop($id);
    dataVB.view = $dataView;
  }
}

function doActiveDesktop(activeID) {
  for (var $navDesktop of $listNavDesktop) {
    if ($navDesktop.getAttribute('id') === activeID) {
      $navDesktop.className = 'navDesktop activeDesktop';
    } else {
      $navDesktop.className = 'navDesktop';
    }
  }
}

function doActiveMobile(activeID) {
  for (var $navMobile of $listNavMobile) {
    if ($navMobile.getAttribute('id') === activeID) {
      $navMobile.className = 'navMobile c-white-shadow';
    } else {
      $navMobile.className = 'navMobile c-white-shadow hidden';
    }
  }
}

function handleNavSelect(event) {
  var $dataView = event.target.value;
  swapDV($dataView);
  dataVB.view = $dataView;
  if (dataVB.view === 'wheel-of-life') {
    doActiveMobile('navMW');
  } else if (dataVB.view === 'vision-board') {
    doActiveMobile('navMVB');
  } else if (dataVB.view === 'quote-of-the-day') {
    doActiveMobile('navMQ');
  }
}

function updatePhotoUrl(event) {
  var $currentUrl = $photoUrl.value;
  if ($currentUrl !== '') {
    $imgPopUp.setAttribute('src', $currentUrl);
  } else {
    $imgPopUp.setAttribute('src', 'images/placeholder.jpeg');
  }
}

function handleSubmit(event) {
  var entry = {};
  entry.url = $formEntryVB.elements.photoUrl.value;
  entry.goal = $formEntryVB.elements.lifeGoal.value;
  if (dataVB.editing === null) {
    entry.entryId = dataVB.nextEntryId;
    dataVB.entries.push(entry);
    dataVB.nextEntryId += 1;
    var newEntry = renderEntryVB(entry);
    $rowVB.prepend(newEntry);
  } else {
    entry.entryId = dataVB.editing.entryId;
    for (var i = 0; i < dataVB.entries.length; i++) {
      if (dataVB.entries[i].entryId === entry.entryId) {
        dataVB.entries.splice(i, 1, entry);
      }
    }
    var editedEntry = renderEntryVB(entry);
    var $entries = $rowVB.querySelectorAll('.col-one-fourth padding-t4');
    for (var j = 0; j < $entries.length; j++) {
      if ($entries[j].getAttribute('data-entryId') === entry.entryId.toString()) {
        $rowVB.replaceChild(editedEntry, $entries[j]);
      }
    }
  }
  closePopUp();
  dataVB.editing = null;
}

function renderEntryVB(entry) {
  var $col = document.createElement('div');
  $col.setAttribute('class', 'col-one-fourth padding-t4');
  $col.setAttribute('data-entryId', entry.entryId);
  var $entryVBContainer = document.createElement('div');
  $entryVBContainer.setAttribute('class', 'entryVBContainer');
  var $edit = document.createElement('div');
  $edit.setAttribute('class', 'edit');
  var $i = document.createElement('i');
  $i.setAttribute('class', 'fa fa-pencil fa-lg');
  $i.setAttribute('data-entryId', entry.entryId);
  var $entryVBOverlay = document.createElement('div');
  $entryVBOverlay.setAttribute('class', 'entryVBOverlay');
  var $imgVB = document.createElement('img');
  $imgVB.setAttribute('class', 'imgVB');
  $imgVB.setAttribute('src', entry.url);
  var $h3 = document.createElement('h3');
  $h3.textContent = entry.goal;
  $col.appendChild($entryVBContainer);
  $entryVBContainer.appendChild($edit);
  $edit.appendChild($i);
  $entryVBContainer.appendChild($entryVBOverlay);
  $entryVBContainer.appendChild($imgVB);
  $entryVBContainer.appendChild($h3);
  return $col;
}

function handleLoad() {
  swapDV(dataVB.view);
  for (var i = dataVB.entries.length - 1; i >= 0; i--) {
    var entryLoad = renderEntryVB(dataVB.entries[i]);
    $rowVB.appendChild(entryLoad);
  }
  if (dataVB.view === 'wheel-of-life') {
    doActiveDesktop('navDW');
  } else if (dataVB.view === 'vision-board') {
    doActiveDesktop('navDVB');
  } else if (dataVB.view === 'quote-of-the-day') {
    doActiveDesktop('navDQ');
  }
}

function handleEdit(event) {
  if (event.target.tagName === 'I') {
    $delete.className = 'popButton';
    openPopUp();
    for (var i = 0; i < dataVB.entries.length; i++) {
      if (dataVB.entries[i].entryId.toString() === event.target.getAttribute('data-entryId')) {
        dataVB.editing = dataVB.entries[i];
        $formEntryVB.elements.photoUrl.value = dataVB.entries[i].url;
        $formEntryVB.elements.lifeGoal.value = dataVB.entries[i].goal;
        updatePhotoUrl();
      }
    }
  }
}

function handleDelete(event) {
  for (var i = 0; i < dataVB.entries.length; i++) {
    if (dataVB.entries[i].entryId === dataVB.editing.entryId) {
      dataVB.entries.splice(i, 1);
    }
  }
  var $entries = $rowVB.querySelectorAll('.col-one-fourth padding-t4');
  for (var j = 0; j < $entries.length; j++) {
    if ($entries[j].getAttribute('data-entryId') === dataVB.editing.entryId.toString()) {
      $rowVB.removeChild($entries[j]);
    }
  }
  closePopUp();
  window.location.reload();
  dataVB.editing = null;
}
