const errorMessages = {
  empty: 'Это обязательное поле',
  emailError: 'Неправильный формат email',
  passwordError: 'Введите не менее 8 символов (без пробелов)',
  textError: 'Введите не менее 2 символов',
  // alreadyExistsError: 'Такой пользователь уже есть',
};

const optionsForApi = {
  headers: {
    'Content-Type': 'application/json'
  },
  url: 'http://localhost:3000',
};

const openedClassPopup = 'popup_is-opened';
const popupLogin = '#popup-login-template';
const popupSignup = '#popup-signup-template';
const popupSuccessfulSignup = '#popup-successful-signup-template';
const iconColorWhite = 'header__auth_icon_white';

const mediaQueryList = window.matchMedia('(max-width: 629px)');
// url: 'https://api.newsforyouproject.ru'

export {
  errorMessages,
  optionsForApi,
  openedClassPopup,
  popupLogin,
  popupSignup,
  popupSuccessfulSignup,
  mediaQueryList,
  iconColorWhite
};