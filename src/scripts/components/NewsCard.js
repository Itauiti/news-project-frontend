export class NewsCard {

  static _template = document.querySelector('#cards-item-template').content;
  constructor(cardsData, keyword, mainApi) {
    this._keyword = keyword;
    this._mainApi = mainApi;
    this._cardsData = cardsData;
  }

  createCard = (changeDateFormat, changeMonthFormat) => {
    this._view = NewsCard._template.cloneNode(true).children[0];
    this._image = this._view.querySelector('.cards__image');
    this._image.src = (this._cardsData.urlToImage || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
    //подумать про авто добавление альта, чеерз заголовок?
    this._date = this._view.querySelector('.cards__date');
    this._date.textContent = changeDateFormat(this._cardsData.publishedAt.slice(0, 10), changeMonthFormat);
    this._title = this._view.querySelector('.cards__title');
    this._title.textContent = this._cardsData.title;
    this._text = this._view.querySelector('.cards__text');
    this._text.textContent = (this._cardsData.content || 'no text');
    this._source = this._view.querySelector('.cards__sourse');
    this._source.textContent = (this._cardsData.source.name || 'no text'); //исправить ошибку в названии в хтмл
    this._icon = this._view.querySelector('.cards__icon');
    this._message = this._view.querySelector('.cards__message');
    this._link = this._cardsData.url;
    this.renderIcon();
    return this._view;
  }

  renderIcon = () => {
    this._icon.classList.add('cards__icon_bookmark');
    let isLoggedIn = true;
    if(isLoggedIn === true) {
      this._icon.addEventListener('click', () => {
        if (!this._icon.classList.contains('cards__icon_bookmark_activ')) {
          this._mainApi.createArticle(this._keyword, this._title.textContent, this._text.textContent, this._date.textContent, this._source.textContent, this._link, this._image.src)
          .then((res) => {
            // console.log(res._id);
            // console.log(res);
            this._icon.classList.add('cards__icon_bookmark_activ');
            // console.log(this._icon);
            this._icon._id = res._id;
            }
          )
        } else {
          this._mainApi.removeArticle(this._icon._id)
          .then(() => {
            // console.log(res);
            this._icon.classList.remove('cards__icon_bookmark_activ');
            // console.log(this._icon);
          })
        }
      }, true);
    } else {
      this._icon.addEventListener('click', () => {
        this._message.classList.add('cards__message_activ');
        setTimeout(() => this._message.classList.remove('cards__message_activ'), 1000);
      })
    }
  }

  // renderIcon = () => {
  //   if(isLoggedIn === true) {
  //     this._icon.addEventListener('click', () => {
  //       this._mainApi.createArticle(this._keyword, this._title, this._text, this._date, this._source, this._link, this._image)
  //       .then(res => {
  //         this._icon.classList.add('cards__icon_bookmark_activ')
  //         }
  //       )

  //     });
  //     if(isSavedCard === true) {
  //       this._icon.classList.add('cards__icon_bookmark_activ');
  //       this._icon.addEventListener('click', );

  //     }
  //   }
  //   this._icon.addEventListener('click', () => {
  //     this._view.querySelector('.cards__message').classList.add('.cards__message_activ');
  //   })
  // }

}

// слушатель на открытие статьи целиком?

// renderIcon — отвечает за отрисовку иконки карточки.
// У этой иконки три состояния: иконка незалогиненного пользователя, активная иконка залогиненного, неактивная иконка залогиненного.

// this._view.querySelector('.cards__message').textContent = 'Убрать из сохранённых';
// this._view.querySelector('.cards__message').classList.add('cards__message_news');
// this._view.querySelector('.cards__icon').classList.add('cards__icon_trash');