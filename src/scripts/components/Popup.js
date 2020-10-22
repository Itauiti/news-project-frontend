export class Popup {
  constructor(openedClass, showHeaderMenu, hideheaderMenu) {
    this._popup = null;
    this._openedClass = openedClass;
    this._showHeaderMenu = showHeaderMenu;
    this._hideheaderMenu = hideheaderMenu;
  }

  setContent = (popupLogin) => {
    const body = document.querySelector('.body');
    const template = document.querySelector(`${popupLogin}`).content;
    this._popup = template.cloneNode(true).children[0];
    body.append(this._popup);
    this._closeIcon = this._popup.querySelector('.popup__close-icon');
    this._setListeners();
  }

  _clearContent = () => {
    this._popup.remove();
  }

  open = () => {
    this._popup.classList.add(this._openedClass);
    this._hideheaderMenu();
  }

  close = () => {
    this._popup.classList.remove(this._openedClass);
    this._clearContent();
    this._removeListeners();
    if (window.matchMedia('screen and (max-width: 629px)').matches) {
      this._showHeaderMenu();
    }
  }

  _setListeners = () => {
    this._closeIcon.addEventListener('click', this.close);
  }

  _removeListeners = () => {
    this._closeIcon.removeEventListener('click', this._setListeners);
  }

  _setListenersToSigup = () => {
    this._link.addEventListener('click', this.close);
  }

  setLinkListener = (openPopupFunctin) => {
    this._link = this._popup.querySelector('.popup__link');
    this._link.addEventListener('click', () => {
      this.close();
      openPopupFunctin();
    });
  }
}