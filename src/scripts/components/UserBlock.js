import { declOfNum } from '../utils/utils';

export class UserBlock {

  constructor(keywordsArr) {
    this._title = document.querySelector('.user-info__title');
    this._text = document.querySelector('.user-info__text');
    this._name = localStorage.getItem('username');
    this._keywordsArr = keywordsArr;
    this._keywordLength = this._keywordsArr.length;
    this._wordOne = document.querySelector('.user-info__text_word_1');
    this._wordTwo = document.querySelector('.user-info__text_word_2');
    this._wordTree = document.querySelector('.user-info__text_word_3');
    this._wordFour = document.querySelector('.user-info__text_word_4');
  }

  render = () => {

    if (this._keywordLength === 0) {
      this._title.textContent = `${this._name}, у вас ещё нет сохранённых статей`;
      this._text.textContent = 'Чтобы сохранить статью на главной странице, нажмите на иконку в правом верхнем углу данной статьи.'
    } else {
      this._savedArticles = declOfNum(this._keywordLength, ['сохранённая статья', 'сохранёные статьи', 'сохранёных статей']);
      this._title.textContent = `${this._name}, у вас ${this._keywordLength} ${this._savedArticles}`;
      this._getTextTextcontent();
    }
  }

  _getTextTextcontent = () => {
    //текст выводит два самых популярных тега пользователя и показыает, какое кол-во тегов у него еще есть (если есть)
    this._numberOfrepetitions = this._keywordsArr.reduce(function(acc, el) {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
    const arr = [];
    for (let y in this._numberOfrepetitions) {
      arr.push([y, this._numberOfrepetitions[y]]);
    }
    arr.sort(function(a, b) {
      return b[1] - a[1];
    });

    if (arr.length === 1) {
      this._wordOne.textContent = arr[0].splice(0, 1);
      this._wordTree.style.display = 'none';
    } else if ((arr.length === 2)) {
      this._wordOne.textContent = `${arr[0].splice(0, 1)}, `;
      this._wordTwo.textContent = arr[1].splice(0, 1);
      this._wordTree.style.display = 'none';
    } else {
      this._wordOne.textContent = `${arr[0].splice(0, 1)}, `;
      this._wordTwo.textContent = `${arr[1].splice(0, 1)} `;
      const rest = arr.length - 2;
      this._wordFour.textContent = declOfNum(rest, [`${rest}-ому другому`, `${rest}-м другим`, `${rest}-и другим`])
    }
  }
}