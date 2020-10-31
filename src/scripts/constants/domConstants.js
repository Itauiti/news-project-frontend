const body = document.querySelector('.body');
const header = body.querySelector('.header');
const headerBurger = header.querySelector('.header__menu');
const resultsContainer = body.querySelector('.results');
const formSearch = document.forms.search;
const headerBurgerMobile = header.querySelector('.header__nav-container');
const navigationContainer = header.querySelector('.navigation__container');
const headerAuthButton = header.querySelector('.header__auth');

export {
  body,
  header,
  headerBurger,
  resultsContainer,
  formSearch,
  headerBurgerMobile,
  navigationContainer,
  headerAuthButton,
};