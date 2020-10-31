import { body, header, headerBurger, headerBurgerMobile } from '../constants/domConstants';

const openCloseHeaderBurger = function() {
  headerBurgerMobile.classList.toggle('header__nav-container_activ');
  headerBurgerMobile.classList.toggle('header_dark');
  header.classList.toggle('header_dark');
  headerBurger.classList.toggle('header__menu_open_white');
  headerBurger.classList.toggle('header__menu_close_white');
  body.classList.toggle('body_noscroll');
}
const showHeaderBurger = function() {
  headerBurger.classList.add('header__menu_open_white');
  headerBurger.style.display = 'block';
}

const hideHeaderBurger = function() {
  headerBurgerMobile.classList.remove('header__nav-container_activ');
  headerBurgerMobile.classList.remove('header_dark');
  header.classList.remove('header_dark');
  headerBurger.classList.remove('header__menu_open_white');
  headerBurger.classList.remove('header__menu_close_white');
  body.classList.remove('body_noscroll');
  headerBurger.style.display = 'none';
}

const screenTestForHeaderBurger = function(e) {
  if (e.matches) {
    headerBurger.style.display = 'block';
  } else {
    headerBurger.style.display = 'none';
  }
};

export { openCloseHeaderBurger, showHeaderBurger, hideHeaderBurger, screenTestForHeaderBurger };