const serverMain = NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.newsforyouproject.ru';
const serverForNews = NODE_ENV === 'development' ? 'https://newsapi.org/v2/' : 'https://nomoreparties.co/news/v2/';

const optionsForMainApi = {
  headers: {
    'Content-Type': 'application/json',
  },
  url: serverMain,
};

const optionsForNewsApi = {
  server: serverForNews,
};

const mediaQueryList = window.matchMedia('(max-width: 629px)');

const errorMessages = {
  empty: 'Это обязательное поле',
  emailError: 'Неправильный формат email',
  passwordError: 'Введите не менее 8 символов (без пробелов)',
  textError: 'Введите не менее 2 символов',
};

const nothingFoundTitle = 'Ничего не найдено';
const nothingFoundText = 'К сожалению по вашему запросу ничего не найдено.';
const notLoggedHeaderText = 'Авторизоваться';
const noArticlesText = 'У вас ещё нет сохранённых статей.';
const errorNewsApiTitle = 'Ошибка';
const errorNewsApiText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

const searchFormClassLists = {
  serverErrorClass: '#intro-error',
  errorClass: '.intro__error',
  inputClass: '.intro__input',
  buttonClass: '.intro__button',
  activButtonClass: 'intro__button_activ',
};

const popupFormClassLists = {
  serverErrorClass: '#auth-error',
  errorClass: '.form__error',
  inputClass: '.form__input',
  buttonClass: '.form__button',
  activButtonClass: 'form__button_activ',
};

const popupClassLists = {
  openedClassPopup: 'popup_is-opened',
  popupLogin: '#popup-login-template',
  popupSignup: '#popup-signup-template',
  popupSuccessfulSignup: '#popup-successful-signup-template',
};

const headerClassLists = {
  iconColorWhite: 'header__auth_icon_white',
  iconColorBlack: 'header__auth_icon_black',
  headerBackgroundColorWhite: 'header__background_white',
  headerBackgroundColorDark: 'header__background_dark',
}

export {
  errorMessages,
  searchFormClassLists,
  popupFormClassLists,
  optionsForMainApi,
  optionsForNewsApi,
  mediaQueryList,
  popupClassLists,
  headerClassLists,
  notLoggedHeaderText,
  nothingFoundTitle,
  nothingFoundText,
  noArticlesText,
  errorNewsApiTitle,
  errorNewsApiText,
};