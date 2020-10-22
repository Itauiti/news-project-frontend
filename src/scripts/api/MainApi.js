export class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  signup(name, email, password ) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка HTTP: " + res.status);
    })
    .catch(err => console.log(err));
  }

  signin(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка HTTP: " + res.status);
    })
    .catch(err => console.log(err));
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка HTTP: " + res.status);
    })
    .catch(err => console.log(err));
  }

  logoutUser() {
    return fetch(`${this._url}/users/me/logout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка HTTP: " + res.status);
    })
    .catch(err => console.log(err));
  }

  getArticles() {
    return fetch(`${this._url}/articles`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка HTTP: " + res.status);
    })
    .catch(err => console.log(err));
  }

  createArticle(keyword, title, text, date, source, link, image ) {
    return fetch(`${this._url}/articles`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка HTTP: " + res.status);
    })
    .catch(err => console.log(err));
  }

  removeArticle(articleId) {
    return fetch(`${this._url}/articles/${articleId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
      params: JSON.stringify({
        articleId,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка HTTP: " + res.status);
    })
    .catch(err => console.log(err));
  }
}