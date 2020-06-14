'use strict';

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var userNameInput = document.querySelector('.setup-user-name');
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


  // Добавляем обработчик клика на кнопку отправки формы
setupSubmit.addEventListener('click', function(evt) {
  // Пройдёмся по всем полям
  console.log('jejdjdjjd');

  evt.preventDefault();
  sendTest();
});

// Отправка форма по нажатию на ENTER
setupSubmit.addEventListener('keydown', function (evt) {
  evt.preventDefault();

  sendTest();
//   // console.log('jejdjdjjd');
// console.log('test', evt.key === 'Enter' && event.target !== setupSubmit);
//   if (evt.key === 'Enter' && event.target !== setupSubmit) {
//     setupSubmit.submit();
//   }
});

};

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


var sendTest = function () {
  console.log('here');
  closePopup();
};


userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MIN_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

