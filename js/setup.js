'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * max) - min);
};

var getRandomItem = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

var generateWizards = function () {

  var wizardsArr = [];

  for (var i = 0; i < 4; i++) {
    wizardsArr.push({
      name: getRandomItem(NAMES),
      surname: getRandomItem(SURNAMES),
      coatColor: getRandomItem(COAT_COLORS),
      eyesColor: getRandomItem(EYES_COLORS)}
    );
  }
  return wizardsArr;
};

var renderWizard = function (wizard) {

  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  return fragment;
};

var wizards = generateWizards();
similarListElement.appendChild(renderWizards(wizards));
userDialog.querySelector('.setup-similar').classList.remove('hidden');


// вторая часть (диалоговое окно и валидация)
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupSubmit = document.querySelector('.setup-submit');


var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && event.target !== setupUserName) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Отправка форма по нажатию на ENTER
setupSubmit.addEventListener('keydown', function () {
  closePopup();
});

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    closePopup();
  }
});

// обработчик на кнопку отправки формы
var setupWizardForm = setup.querySelector('.setup-wizard-form');
setupWizardForm.addEventListener('submit', function () {
  closePopup();
});

// Изменение цвета мантии персонажа по нажатию
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
wizardCoat.addEventListener('click', function () {
  var selectedColor = getRandomItem(COAT_COLORS);
  var coatColorInput = document.querySelector('input[name="coat-color"]');

  wizardCoat.style = 'fill:' + selectedColor;
  coatColorInput.value = selectedColor;
});

// Изменение цвета глаз персонажа по нажатию
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
wizardEyes.addEventListener('click', function () {
  var selectedColor = getRandomItem(EYES_COLORS);
  var eyesColorInput = document.querySelector('input[name="eyes-color"]');

  wizardEyes.style = 'fill:' + selectedColor;
  eyesColorInput.value = selectedColor;
});

// Изменение цвета фаерболов по нажатию
var fireball = setup.querySelector('.setup-fireball-wrap');
fireball.addEventListener('click', function () {
  var selectedColor = getRandomItem(FIREBALL_COLORS);
  var fireballColorInput = document.querySelector('input[name="fireball-color"]');

  fireball.style = 'background:' + selectedColor;
  fireballColorInput.value = selectedColor;
});
