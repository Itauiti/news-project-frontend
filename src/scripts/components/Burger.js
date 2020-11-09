import { body, header, headerBurger, headerBurgerMobile } from '../constants/domConstants';

export class Burger {
  constructor(headerBackgroundColor) {
    this._headerBackgroundColor = headerBackgroundColor;

  }
  openCloseHeaderBurger = () => {
    headerBurgerMobile.classList.toggle('header__nav-container_activ');
    headerBurgerMobile.classList.toggle(this._headerBackgroundColor);
    header.classList.toggle(this._headerBackgroundColor);
    headerBurger.classList.toggle('header__menu_open_white');
    headerBurger.classList.toggle('header__menu_close_white');
    body.classList.toggle('body_overlay');
    body.classList.toggle('body_noscroll');
  }

  showHeaderBurger = () => {
    headerBurger.classList.add('header__menu_open_white');
    headerBurger.style.display = 'block';
  }

  hideHeaderBurger = () => {
    headerBurgerMobile.classList.remove('header__nav-container_activ');
    headerBurgerMobile.classList.remove(this._headerBackgroundColor);
    header.classList.remove(this._headerBackgroundColor);
    headerBurger.classList.remove('header__menu_open_white');
    headerBurger.classList.remove('header__menu_close_white');
    body.classList.remove('body_overlay');
    body.classList.remove('body_noscroll');
    headerBurger.style.display = 'none';
  }

  screenTestForHeaderBurger = (e) => {
    if (e.matches) {
      headerBurger.style.display = 'block';
    } else {
      headerBurger.style.display = 'none';
    }
  };
}