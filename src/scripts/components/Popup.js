export class Popup {
  constructor(openedClass, burger) {
    this._popup = null;
    this._openedClass = openedClass;
    this._burger = burger;
  }

  setContent = (popupLogin, openPopupFunction) => {
    const body = document.querySelector('.body');
    const template = document.querySelector(`${popupLogin}`).content;
    this._popup = template.cloneNode(true).children[0];
    body.append(this._popup);
    this._closeIcon = this._popup.querySelector('.popup__close-icon');
    this._link = this._popup.querySelector('.popup__link');
    this._setListeners(openPopupFunction);
  }

  open = () => {
    this._popup.classList.add(this._openedClass);
    if (window.matchMedia('screen and (max-width: 629px)').matches) {
      this._burger.hideHeaderBurger();
    }
  }

  close = () => {
    this._removeListeners();
    this._popup.remove();
    this._popup.classList.remove(this._openedClass);
    if (window.matchMedia('screen and (max-width: 629px)').matches) {
      this._burger.showHeaderBurger();
    }
  }

  _setListeners = (openPopupFunction) => {
    this._closeIcon.addEventListener('click', this.close);
    this._link.addEventListener('click', () => {
      this.close();
      openPopupFunction();
    });
  }

  _removeListeners = () => {
    this._closeIcon.removeEventListener('click', this._setListeners);
    this._link.removeEventListener('click', () => {
      this.close();
      openPopupFunction();
    });
  }
}