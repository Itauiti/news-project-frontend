import { Popup } from './components/Popup.js';
import { Header } from './components/Header.js';
import { Form } from './components/Form.js';
import { MainApi } from './api/MainApi.js';
import { NewsApi } from './api/NewsApi.js';
import { NewsCard } from './components/NewsCard';
import { NewsCardList } from './components/NewsCardList';
import "../styles/index.css";



const formSearch = document.forms.search;

const options = {
  headers: {
    'Content-Type': 'application/json'
  },
  url: 'http://localhost:3000',
}
// url: 'https://api.newsforyouproject.ru'
const mainApi = new MainApi(options);
const newsApi = new NewsApi();

const body = document.querySelector('.body');
const header = body.querySelector('.header');
const headerMenu = header.querySelector('.header__menu');
const headerMenuMobile = header.querySelector('.header__nav-container');
const navigationContainer = header.querySelector('.navigation__container');
const headerAuthButton = header.querySelector('.header__auth');
//время...............................................
const changeMonthFormat = function(data) {
  if (data == 0) {
    return 'января';
  }
  if (data == 1) {
    return 'февряля';
  }
  if (data == 2) {
    return 'марта';
  }
  if (data == 3) {
    return 'апреля';
  }
  if (data == 4) {
    return 'мая';
  }
  if (data == 5) {
    return 'июня';
  }
  if (data == 6) {
    return 'июля';
  }
  if (data == 7) {
    return 'августа';
  }
  if (data == 8) {
    return 'сентября';
  }
  if (data == 9) {
    return 'октября';
  }
  if (data == 10) {
    return 'ноября';
  }
  if (data == 11) {
    return 'января';
  }
}

const changeDateFormat = function(data, changeMonthFormat) {
  const newDate = new Date(data);
  return `${newDate.getDate()} ${changeMonthFormat(newDate.getMonth())}, ${newDate.getFullYear()}`;
}

const currentDate = function(){
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}
// alert( currentDateToRef() );

const getDateAgo = function(date) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - 7);
  const newDate = dateCopy.getDate();
  return `${dateCopy.getFullYear()}-${dateCopy.getMonth()+1}-${dateCopy.getDate()}`;
}
const currentDateToRef = currentDate();
const getDateAgoToRef = getDateAgo(new Date());


// alert(getDateAgo(new Date()));
// alert(getDateAgo(new Date(2015, 0, 1)));

//конец время..............................................................
const errorMessages = {
  empty: 'Это обязательное поле',
  emailError: 'Неправильный формат email',
  passwordError: 'Введите не менее 8 символов (без пробелов)',
  textError: 'Введите не менее 2 символов',
  alreadyExistsError: 'Такой пользователь уже есть',
}
const openCloseHeaderMenu = function() {
  headerMenuMobile.classList.toggle('header__nav-container_activ');
  headerMenuMobile.classList.toggle('header_dark');
  header.classList.toggle('header_dark');
  headerMenu.classList.toggle('header__menu_open_white');
  headerMenu.classList.toggle('header__menu_close_white');
  body.classList.toggle('body_noscroll');
}
const showHeaderMenu = function() {
  headerMenu.classList.add('header__menu_open_white');
  headerMenu.style.display = 'block';
}

const hideHeaderMenu = function() {
  headerMenuMobile.classList.remove('header__nav-container_activ');
  headerMenuMobile.classList.remove('header_dark');
  header.classList.remove('header_dark');
  headerMenu.classList.remove('header__menu_open_white');
  headerMenu.classList.remove('header__menu_close_white');
  body.classList.remove('body_noscroll');
  headerMenu.style.display = 'none';
}

headerMenu.addEventListener('click', openCloseHeaderMenu);

const openedClassPopup = 'popup_is-opened';
const popup = new Popup(openedClassPopup, showHeaderMenu, hideHeaderMenu);

const popupLogin = '#popup-login-template';
const popupSignup = '#popup-signup-template';
const popupSuccessfulSignup = '#popup-successful-signup-template';
////////////////////////

// let popupIsOpenedEvent = new CustomEvent('popupIsOpened');
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const headerr = new Header();
const imgSrc = require('../images/header_logout_white.png');
// let isLoggedIn = false;
//
// localStorage.getItem('name');
// console.log(localStorage.getItem('name'));
// localStorage.getItem('token');
// headerr.render(true, navigationContainer, headerAuthButton, data.name, imgSrc, 'white-text' );
mainApi.getUserData()
.then((data) => {
  if (data === undefined) {
    headerr.render(false, 'Авторизоваться');

    headerAuthButton.addEventListener('click', openSigninPopup);
  } else {
    headerr.render(true, data[0].name);
    headerAuthButton.removeEventListener('click', openSigninPopup);
    headerAuthButton.addEventListener('click', () => {
      mainApi.logoutUser().then(() => {
        headerr.render(false, 'Авторизоваться');
      })
    });
  }
  console.log(data);
})


// headerAuthButton.addEventListener('click', () => {
//   openSigninPopup();
// });

const openSigninPopup = function() {
  popup.setContent(popupLogin);
  popup.setLinkListener(openSignupPopup);
  popup.open();
  //////////////////////////////////////////////////////////////////////////////////////////

  // headerMenu.removeEventListener('click', openCloseHeaderMenu);
  //////////////////////////////////////////////////////////////////////////////////////////
  const formLogin = document.forms.login;
  const formLoginClass = new Form(formLogin, errorMessages);
  formLoginClass.initialization();//накидали валидацию
  formLogin.addEventListener('submit', (event) => { //слушатель на сабмит лигина
    event.preventDefault();
    const data = {
      email: formLogin.elements.email.value,
      password: formLogin.elements.password.value,
    };
    mainApi.signin(data.email, data.password)
    .then((data) => {
        headerr.render(true, data.name);
        headerAuthButton.removeEventListener('click', openSigninPopup);
        headerAuthButton.addEventListener('click', () => {
          mainApi.logoutUser().then(() => {
            headerr.render(false, 'Авторизоваться');
            headerAuthButton.addEventListener('click', openSigninPopup);
          })
        });
        popup.close();
    })
    .catch(err => console.log(err));
  });
}


const openSignupPopup = function() {
  popup.setContent(popupSignup);
  popup.setLinkListener(openSigninPopup);
  popup.open();
  const formSignup = document.forms.signup;
  const formSignupClass = new Form(formSignup, errorMessages);
  formSignupClass.initialization();
  formSignup.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      name: formSignup.elements.name.value,
      email: formSignup.elements.email.value,
      password: formSignup.elements.password.value,
    };
    mainApi.signup(data.name, data.email, data.password)
    .then(() => {
      // if (res.status === '409') {

      // }
      popup.close();
      openSuccessfulSignupPopup();
    })
    .catch(err => console.log(err));
  });
}

const openSuccessfulSignupPopup = function() {
  popup.setContent(popupSuccessfulSignup);
  popup.setLinkListener(openSigninPopup);
  popup.open();
}

// const renderIconFunction = function(card) {
//   mainApi.createArticle(keyword, title, text, date, source, link, image)
//   .then()
// }
window.addEventListener('keyup', function (event) {
  if (event.key === 'Escape' || event.key === 'Esc' || event.key === 27) {
    popup.close();
  }
})

// window.addEventListener(popup.close, function () {

// })

const resultsContainer = body.querySelector('.results');
formSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.firstChild);
  }
  const newsCardList = new NewsCardList(resultsContainer);
  newsCardList.renderLoader();
  // const newsCard = new NewsCard();
  const data = {
    keyword: formSearch.elements.search.value,
  };
  newsApi.getNews(data.keyword, getDateAgoToRef, currentDateToRef)
  .then(res => {
    if (res.articles.length === 0) {
      newsCardList.clearNewsCardList();
      newsCardList.renderNotFoundNews('Ничего не найдено','К сожалению по вашему запросу ничего не найдено.');
    } else {
      res.articles.forEach(item => {
        const newsCard = new NewsCard(item, data.keyword, mainApi)
        const x = newsCard.createCard(changeDateFormat, changeMonthFormat);
        // const x = newsCard.createCard(item, data.keyword, changeDateFormat, changeMonthFormat, mainApi);
        newsCardList.addCard(x);
      })
      newsCardList.clearNewsCardList();
      newsCardList.renderResults();
    }
  })
  .catch((err) => {
    newsCardList.clearNewsCardList();
    newsCardList.renderNotFoundNews(`Ошибка HTTP: ${err}`, 'Что-то пошло не так');
  }
  );
});

