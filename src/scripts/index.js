import { Popup } from './components/Popup.js';
import { Header } from './components/Header.js';
import { Form } from './components/Form.js';
import { MainApi } from './api/MainApi.js';
import { NewsApi } from './api/NewsApi.js';
import { NewsCard } from './components/NewsCard';
import { NewsCardList } from './components/NewsCardList';

import { headerBurger, resultsContainer, formSearch, headerAuthButton } from './constants/domConstants';
import { errorMessages, optionsForApi, openedClassPopup, popupLogin, popupSignup, popupSuccessfulSignup, mediaQueryList} from './constants/constants';
import { getDateAgoToRef, currentDateToRef, changeDateFormat, changeMonthFormat } from './utils/dateFunctions';
import { openCloseHeaderBurger, showHeaderBurger, hideHeaderBurger, screenTestForHeaderBurger } from './utils/headerBurgerFunctions';

import "../styles/index.css";


const mainApi = new MainApi(optionsForApi);
const newsApi = new NewsApi();
const popup = new Popup(openedClassPopup, showHeaderBurger, hideHeaderBurger);
const headerr = new Header();

//?????????????????????
const imgSrc = require('../images/header_logout_white.png');

//Рендер авторизованной/неавторизованной шапки страницы
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
});

//Листнеры
window.addEventListener('keyup', function (event) {
  if (event.key === 'Escape' || event.key === 'Esc' || event.key === 27) {
    popup.close();
  }
});

mediaQueryList.addListener(screenTestForHeaderBurger);

headerBurger.addEventListener('click', openCloseHeaderBurger);

formSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.firstChild);
  }
  const newsCardList = new NewsCardList(resultsContainer);
  newsCardList.renderLoader();
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


const openSigninPopup = function() {
  popup.setContent(popupLogin);
  popup.setLinkListener(openSignupPopup);
  popup.open();
  const formLogin = document.forms.login;
  const formLoginClass = new Form(formLogin, errorMessages);
  formLoginClass.initialization();
  formLogin.addEventListener('submit', (event) => {
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
};

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
};

const openSuccessfulSignupPopup = function() {
  popup.setContent(popupSuccessfulSignup);
  popup.setLinkListener(openSigninPopup);
  popup.open();
};

