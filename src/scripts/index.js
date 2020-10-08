import "../styles/index.css";

const body = document.querySelector('.body');
const header = body.querySelector('.header');
const headerMenu = header.querySelector('.header__menu');
const headerMenuMobile = header.querySelector('.header__nav-container');

headerMenu.addEventListener('click', () => {
  headerMenuMobile.classList.toggle('header__nav-container_activ');
  headerMenuMobile.classList.toggle('header_dark');
  header.classList.toggle('header_dark');
  headerMenu.classList.toggle('header__menu_open_white');
  headerMenu.classList.toggle('header__menu_close_white');
  body.classList.toggle('body_noscroll');
});

