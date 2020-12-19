import { Header } from '../components/Header';
import { MainApi } from '../api/MainApi.js';
import { NewsCard } from '../components/NewsCard';
import { NewsCardList } from '../components/NewsCardList';
import { UserBlock } from '../components/UserBlock';
import { Burger } from '../components/Burger';

import { headerBurger, resultsContainer, headerAuthButton } from '../constants/domConstants';
import { optionsForMainApi, mediaQueryList, notLoggedHeaderText, headerClassLists } from '../constants/constants';
import { toUpperCaseFirstCharacter } from '../utils/utils';

import "../../styles/news.css";

const mainApi = new MainApi(optionsForMainApi);
const header = new Header(headerClassLists.iconColorBlack);
const burger = new Burger(headerClassLists.headerBackgroundColorWhite);

mainApi.getUserData()
.then((data) => {
  header.render(true, data[0].name);
  headerAuthButton.addEventListener('click', logout);
})
.catch(() => {
  document.location.href = 'http://newsforyouproject.ru';
});

const logout = function() {
  mainApi.logoutUser()
  .then(() => {
    header.render(false, notLoggedHeaderText);
    document.location.href = 'http://newsforyouproject.ru';
    headerAuthButton.removeEventListener('click', logout);
    headerAuthButton.addEventListener('click', openSigninPopup);
    localStorage.removeItem('username');
  })
  .catch(err => console.log(err.message));
}

mediaQueryList.addListener(burger.screenTestForHeaderBurger);

headerBurger.addEventListener('click', () => {
  burger.openCloseHeaderBurger();
});

mainApi.getArticles()
.then(res => {
  const newsCardList = new NewsCardList(resultsContainer);
  const keywordsArr = res.map(item => {
    return toUpperCaseFirstCharacter(item.keyword);
  });
  const userBlock = new UserBlock(keywordsArr);

  if (keywordsArr.length === 0) {
    userBlock.render();
  } else {
    userBlock.render();
    res.forEach(item => {
      const cardsData = {
        date: item.date,
        image: item.image,
        keyword: toUpperCaseFirstCharacter(item.keyword),
        link: item.link,
        source: item.source,
        text: item.text,
        title: item.title,
      };
      const newsCard = new NewsCard(cardsData, mainApi);
      const createdCard = newsCard.createCard();
      newsCard.renderTrashIcon(item._id);
      newsCardList.addCard(createdCard);
    })
    newsCardList.renderAllCards();
  }
})
.catch(err => console.log(err.message));


