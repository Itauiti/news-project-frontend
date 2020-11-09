export class Header {

  constructor(iconColor) {
    this.iconColor = iconColor;
  }

  render = (isLoggedIn, userName) => {
    this._navigationItemArticles = document.querySelector('.navigation__item_articles');
    this._button = document.querySelector('.header__auth_text');
    this._button.textContent = userName;

    if (isLoggedIn == true) {
      this._button.classList.add(this.iconColor);
      this._navigationItemArticles.style.display = 'block';
    } else {
      this._navigationItemArticles.style.display = 'none';
      this._button.classList.remove(this.iconColor);
    }
  }
}
