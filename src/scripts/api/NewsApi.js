export class NewsApi {
  constructor(options){
    this._options = options;
  }

  getNews(keyword, sevenDaysAgo, currentDate) {
    return fetch(
      `${this._options.server}everything?q=${keyword}&from=${sevenDaysAgo}&to=${currentDate}&pageSize=100&apiKey=d8f9031deae14d35a2479e14237d5371`
      )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
  }
}

