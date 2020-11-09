import { UserBlock } from '../components/UserBlock';
import { toUpperCaseFirstCharacter } from '../utils/utils';

export class NewsCard {

  static _template = document.querySelector('#cards-item-template').content;

  constructor(cardsData, mainApi) {
    this._mainApi = mainApi;
    this._cardsData = cardsData;
  }

  createCard = () => {
    this._view = NewsCard._template.cloneNode(true).children[0];
    this._card = this._view.querySelector('.cards__item');
    this._date = this._view.querySelector('.cards__date');
    this._date.textContent = this._cardsData.date;
    this._image = this._view.querySelector('.cards__image');
    this._image.src = (this._cardsData.image);
    this._image.setAttribute('alt', 'Фото из статьи');
    this._keyword = this._view.querySelector('.cards__label');
    this._keyword.textContent = this._cardsData.keyword;
    this._title = this._view.querySelector('.cards__title');
    this._title.textContent = this._cardsData.title;
    this._text = this._view.querySelector('.cards__text');
    this._text.textContent = this._cardsData.text;
    this._source = this._view.querySelector('.cards__source');
    this._source.textContent = (this._cardsData.source);
    this._icon = this._view.querySelector('.cards__icon');
    this._message = this._view.querySelector('.cards__message');
    this._link = this._cardsData.link;
    this._view.onclick = () => window.open(this._link);
    return this._view;
  }

  renderIcon = (isLoggedIn) => {
    this._icon.classList.add('cards__icon_bookmark');
    if(isLoggedIn === true) {
      this._icon.addEventListener('click', this._loggedIn);
    } else {
      this._icon.removeEventListener('click', this._loggedIn);
      this._icon.onmouseover = () => {
        this._message.classList.add('cards__message_activ');
        setTimeout(() => this._message.classList.remove('cards__message_activ'), 1500);
      }
    }
  }

  _loggedIn = () => {
    event.stopPropagation();
    if (!this._icon.classList.contains('cards__icon_bookmark_activ')) {
      this._mainApi.createArticle(this._keyword.textContent, this._title.textContent, this._text.textContent, this._date.textContent, this._source.textContent, this._link, this._image.src)
      .then((res) => {
        this._icon.classList.add('cards__icon_bookmark_activ');
        this._icon._id = res._id;
        }
      )
    } else {
      this._mainApi.removeArticle(this._icon._id)
      .then(() => {
        this._icon.classList.remove('cards__icon_bookmark_activ');
      })
    }
  }

  renderTrashIcon = (id) => {
    this._id = id;
    this._icon.classList.add('cards__icon_trash');
    this._message.textContent = 'Убрать из сохраненных';
    this._icon.onmouseover = () => {
      this._message.classList.add('cards__message_activ');
      setTimeout(() => this._message.classList.remove('cards__message_activ'), 1500);
    }
    this._icon.addEventListener('click', this._remove);
  }

  _remove = () => {
    event.stopPropagation();
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      this._mainApi.removeArticle(this._id)
        .then((res) => {
          console.log(res);
          this._icon.removeEventListener('click', this._remove);
          this._view.remove();

          this._mainApi.getArticles()
          .then(res => {
            const keywordsArr = res.map(item => {
              return toUpperCaseFirstCharacter(item.keyword);
            });
            const userBlock = new UserBlock(keywordsArr);
            userBlock.render();
          })
          .catch(err => console.log(err.message));
        })
        .catch(err => console.log(err));//аааааааааааааааа
    }
  }
}