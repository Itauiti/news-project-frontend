export class NewsCardList {

  static _template = document.querySelector('#results-template').content;

  constructor(container) {
    this._container = container;
    this._view = NewsCardList._template.cloneNode(true).children[0];
    this._cards = this._view.querySelector('.cards');
    this._cardArr = [];
    this._loadingItem = null;
  }

  addCard = (newCard) => {
    this._cardArr.push(newCard);
    return this._cardArr;
  }

  renderCardsInParts = () => {
    const numberOfCardsInRow = 3;
    if (this._cardArr.length > numberOfCardsInRow) {
      for (let i = 0; i < numberOfCardsInRow; i++) {
        this._cards.appendChild(this._cardArr[i]);
      }
      this._cardArr.splice(0, numberOfCardsInRow);
      this._container.appendChild(this._view);
    } else if (1 <= this._cardArr.length <= numberOfCardsInRow) {
      this._button.style.display = "none";
      for (let i = 0; i < numberOfCardsInRow; i++) {
        this._cards.appendChild(this._cardArr[i]);
      }
      this._cardArr.splice(0, numberOfCardsInRow);
      this._container.appendChild(this._view);
    }
  }

  renderAllCards = () => {
    this._cardArr.forEach(item => this._cards.appendChild(item));
    this._container.appendChild(this._view);
  }

  renderLoader = () => {
    const loadingItem = document.createElement('div');
    const container = document.createElement('div');
    const preloader = document.createElement('div');
    const text = document.createElement('p');

    loadingItem.classList.add('loading-block');
    container.classList.add('loading-block__container');
    container.classList.add('container');
    preloader.classList.add('loading-block__preloader');
    text.classList.add('loading-block__text');
    text.textContent = 'Идет поиск новостей...';

    loadingItem.appendChild(container);
    container.appendChild(preloader);
    container.appendChild(text);
    this._loadingItem = loadingItem;
    this._container.appendChild(this._loadingItem);
  }

  renderError = (titleText, message) => {
    const loadingItem = document.createElement('div');
    const container = document.createElement('div');
    const image = document.createElement('img');
    const title = document.createElement('p');
    const text = document.createElement('p');

    loadingItem.classList.add('loading-block');
    container.classList.add('loading-block__container');
    container.classList.add('container');
    image.classList.add('loading-block__img');
    title.classList.add('loading-block__title');
    text.classList.add('loading-block__text');
    title.textContent = titleText;
    text.textContent = message;

    loadingItem.appendChild(container);
    container.appendChild(image);
    image.src = '../images/loading-block_not-found.svg';
    container.appendChild(title);
    container.appendChild(text);
    this._loadingItem = loadingItem;
    this._container.appendChild(this._loadingItem);
  }

  showMore = () => {
    this._button = this._view.querySelector('.results__button');
    this._button.addEventListener('click', () => {
      this.renderCardsInParts();
    })
  }

  clearNewsCardList = () => {
    this._container.removeChild(this._loadingItem);
  }
}