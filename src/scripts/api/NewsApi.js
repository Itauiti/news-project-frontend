export class NewsApi {
  constructor(){}

  getNews(keyword, sevenDaysAgo, currentDate) {
    return fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&from=${sevenDaysAgo}&to=${currentDate}&pageSize=100&apiKey=d8f9031deae14d35a2479e14237d5371`
      )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }
}
