import { Popup } from './components/Popup.js';
import { Header } from './components/Header.js';
import { Form } from './components/Form.js';
import { MainApi } from './api/MainApi.js';
import { NewsApi } from './api/NewsApi.js';
import { NewsCard } from './components/NewsCard';
import { NewsCardList } from './components/NewsCardList';
import { Burger } from './components/Burger';

import { headerBurger, resultsContainer, formSearch, headerAuthButton } from './constants/domConstants';
import { getDateAgoToRef, currentDateToRef, changeDateFormat, changeMonthFormat } from './utils/dateFunctions';
import {
  errorMessages, popupFormClassLists, optionsForMainApi, optionsForNewsApi, popupClassLists, headerClassLists, mediaQueryList,
  notLoggedHeaderText, nothingFoundTitle, nothingFoundText, errorNewsApiTitle, errorNewsApiText
} from './constants/constants';

import "../styles/index.css";

const mainApi = new MainApi(optionsForMainApi);
const newsApi = new NewsApi(optionsForNewsApi);
const header = new Header(headerClassLists.iconColorWhite);
const burger = new Burger(headerClassLists.headerBackgroundColorDark);
const popup = new Popup(popupClassLists.openedClassPopup, burger);

//Рендер авторизованной/неавторизованной шапки страницы
mainApi.getUserData()
.then((data) => {
  header.render(true, data[0].name);
  headerAuthButton.addEventListener('click', logout);
  localStorage.setItem('username', data[0].name);
})
.catch(() => {
  header.render(false, notLoggedHeaderText);
  headerAuthButton.addEventListener('click', openSigninPopup);
});

const logout = function() {
  mainApi.logoutUser()
  .then(() => {
    header.render(false, notLoggedHeaderText);
    location = './';
    headerAuthButton.removeEventListener('click', logout);
    headerAuthButton.addEventListener('click', openSigninPopup);
    localStorage.removeItem('username');
    // while (resultsContainer.firstChild) {
    //   resultsContainer.removeChild(resultsContainer.firstChild);
    // };
  })
  .catch(err => console.log(err.message));//подумать над выводом ошибок, отдельную страницу?
}

window.addEventListener('keyup', (event) => {
  if (event.key === 'Escape' || event.key === 'Esc' || event.key === 27) {
    popup.close();
  }
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains(popupClassLists.openedClassPopup)) {
    popup.close();
  }
});

mediaQueryList.addListener(burger.screenTestForHeaderBurger);

headerBurger.addEventListener('click', () => {
  burger.openCloseHeaderBurger();
});

//formSearch подумать
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
      newsCardList.renderError(nothingFoundTitle, nothingFoundText);
    } else {
      res.articles.forEach(item => {
        const cardsData = {
          date: changeDateFormat(item.publishedAt.slice(0, 10), changeMonthFormat),
          image: item.urlToImage || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          keyword: data.keyword,
          link: item.url,
          source: item.source.name || 'no text',
          title: item.title,
          text: item.description || 'no text',
        };
        const newsCard = new NewsCard(cardsData, mainApi);
        const createdCard = newsCard.createCard();
        if (localStorage.getItem('username') === null) {
          newsCard.renderIcon(false);
        } else {
          newsCard.renderIcon(true);
        }
        newsCardList.addCard(createdCard);
      })
      newsCardList.clearNewsCardList();
      newsCardList.renderCardsInParts();
      newsCardList.showMore();
    }
  })
  .catch((err) => {
    newsCardList.clearNewsCardList();
    newsCardList.renderError(`${errorNewsApiTitle}: ${err}`, errorNewsApiText);
    }
  );
});

const openSigninPopup = function() {
  popup.setContent(popupClassLists.popupLogin, openSignupPopup);
  popup.open();
  const formLogin = document.forms.login;
  const formLoginClass = new Form(formLogin, popupFormClassLists, errorMessages);
  formLoginClass.initialization();
  formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      email: formLogin.elements.email.value,
      password: formLogin.elements.password.value,
    };
    mainApi.signin(data.email, data.password)
    .then((data) => {
      header.render(true, data.name);
      headerAuthButton.removeEventListener('click', openSigninPopup);
      headerAuthButton.addEventListener('click', logout);
      localStorage.setItem('username', data.name);
      console.log(localStorage.getItem('username'));
      popup.close();
      while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
      }
    })
    .catch(err => {
      formLoginClass.setServerError(err.message);
    });
  });
};

const openSignupPopup = function() {
  popup.setContent(popupClassLists.popupSignup, openSigninPopup);
  popup.open();
  const formSignup = document.forms.signup;
  const formSignupClass = new Form(formSignup, popupFormClassLists, errorMessages);
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
      popup.close();
      openSuccessfulSignupPopup();
    })
    .catch(err => {
      formSignupClass.setServerError(err.message);
    });
  });
};

const openSuccessfulSignupPopup = function() {
  popup.setContent(popupClassLists.popupSuccessfulSignup, openSigninPopup);
  popup.open();
};

