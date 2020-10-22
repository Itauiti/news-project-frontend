// const imgSrc = require('../../images/header_logout_white.png');

export class Header {
  constructor(){}

  render = (isLoggedIn, userName) => {
    this._navigationItemArticles = document.querySelector('.navigation__item_articles');

    this._buttonIcon = document.querySelector('.header__icon');
    this._button = document.querySelector('.header__auth');
    this._button.textContent = userName;
    if(isLoggedIn == true) {

      // this._buttonIcon.style.display = 'block';
      this._navigationItemArticles.style.display = 'block';


    } else {
      this._navigationItemArticles.style.display = 'none';
      // this._buttonIcon.style.display = 'none';
    }
  }

}

// render при вызове перерисовывает шапку в зависимости от переданного аргумента — объекта props. У этого объекта есть два обязательных свойства:
// isLoggedIn — залогинен ли пользователь;
// userName — имя, которое отображается в шапке залогиненного пользователя.

      // const item = document.createElement('li');
      // const link = document.createElement('a');
      // item.classList.add('navigation__item');
      // link.classList.add('navigation__link');
      // link.classList.add(className);
      // img.classList.add('header__icon');

      // item.appendChild(link);
      // nameContainer.appendChild(img);
      // container.appendChild(item);

      // img.classList.add('header__icon');
      // link.href = 'news.html';
      // link.textContent = 'Не должно быть';