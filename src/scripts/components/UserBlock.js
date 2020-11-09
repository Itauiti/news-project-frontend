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
    this._getSavedArticles();
    if (this._keywordLength === 0) {
      this._title.textContent = `${this._name}, у вас ещё нет сохранённых статей`;
      this._text.textContent = 'Чтобы сохранить статью на главной странице, нажмите на иконку в правом верхнем углу данной статьи.'
    } else {
      this._title.textContent = `${this._name}, у вас ${this._keywordLength} ${this._savedArticles}`;
      this._getKeywordStatistic();
    }
  }

  _getSavedArticles = () => {
    if (this._keywordLength === 0) {
      this._text.textContent = '';
    } else if ((this._keywordLength === 1) || (this._keywordLength === 21) || this._keywordLength === 31 || this._keywordLength === 41 || this._keywordLength === 51 || this._keywordLength === 61 || this._keywordLength === 71 || this._keywordLength === 81 || this._keywordLength === 91) {
      this._savedArticles = 'сохранённая статья';
      //потом это исправлю ((((((((
    } else if (this._keywordLength === 2 || this._keywordLength === 3 || this._keywordLength === 4 || this._keywordLength === 22 || this._keywordLength === 23 || this._keywordLength === 24 || this._keywordLength === 32 || this._keywordLength === 33 || this._keywordLength === 34
      || this._keywordLength === 42 || this._keywordLength === 43 || this._keywordLength === 44 || this._keywordLength === 52 || this._keywordLength === 53 || this._keywordLength === 54 || this._keywordLength === 62 || this._keywordLength === 63 || this._keywordLength === 64
      || this._keywordLength === 72 || this._keywordLength === 73 || this._keywordLength === 74 || this._keywordLength === 82 || this._keywordLength ===  83 || this._keywordLength === 84 || this._keywordLength === 92 || this._keywordLength === 93 || this._keywordLength === 94) {
      this._savedArticles = 'сохранёные статьи';
    } else {
      this._savedArticles = 'сохранёных статей';
    }
    return this._savedArticles;
  }

  _getKeywordStatistic = () => {
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
      if (rest === 1 || rest === 21 || rest === 31 || rest === 41 || rest === 51 || rest === 61 || rest === 71 || rest === 81 || rest === 91) {
        this._wordFour.textContent = `${rest} другому`;
      } else {
        this._wordFour.textContent = `${rest} другим`;
      }
    }
  }
}