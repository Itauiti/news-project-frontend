# news-project-frontend
Версия 0.0.1

## О проекте:
Дипломный проект в ЯндексПрактикуме (верстка).
Двухстраничный адаптивный сайт (от 320px) по поиску новостей и сохранению статей в личный кабинет.
На главной странице по ключевым словам отображаются новости за последние 7 дней, которые можно добавить в личный кабинет (еще не реализовано).
Страница с сохраненными статьями (для авторизованных пользователей) позволяет просматривать добавленные ранее статьи или удалить их из списка сохраненных (еще не реализовано).

На данный момент на главной странице реализовано открытие меню в мобильной версии.
Для просмотра попапов нужно к секции popup добавить модификатор popup_is-opened.
Секции loading-block открыты и продублированы с разным контентом, но в дальнейшем будут появляться по необходимости.
Всё взаимодействие JS планируется к 1 ноября 2020.

## Ссылка на github pages:
https://itauiti.github.io/news-project-frontend/

## Ссылка на репозиторий бэкенда проекта:
https://github.com/Itauiti/news-project-api.git

## Ближайшие планы на доработку:
- JS взаимодействие страницы, всех элементов и подключение стороннего API
- Иконку меню сделать меняющей свое состояние (от списка к крестику) через css-анимацию
- Запретить скролл при открытых попапах

## Стэк технологий:
CSS3, HTML5, Webpack, BEM

## Пакеты которые используются в проекте:
- [Babel CLI](https://babeljs.io/docs/en/babel-cli#docsNav)
- [Babel Core](https://babeljs.io/docs/en/babel-core)
- [Babel Preset Evnvironment](https://babeljs.io/docs/en/babel-preset-env#docsNav)
- [Сore JS](https://github.com/zloirock/core-js#readme)
- [PostCSS](https://postcss.org/)
- [postcss-loader](https://www.npmjs.com/package/postcss-loader)
- [autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [babel-loader](https://www.npmjs.com/package/babel-loader)
- [babel-plugin-transform-class-properties](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)
- [Cross-Env](https://www.npmjs.com/package/cross-env)
- [cssnano](https://www.npmjs.com/package/cssnano)
- [gh-pages](https://www.npmjs.com/package/gh-pages)
- [File loader](https://github.com/webpack-contrib/file-loader)
- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
- [Image Webpack loader](https://www.npmjs.com/package/image-webpack-loader)
- [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)
- [Optimize CSS assets](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)
- [css-loader](https://www.npmjs.com/package/css-loader)
- [Style loader](https://github.com/webpack-contrib/style-loader)
- [webpack](https://www.npmjs.com/package/webpack)
- [webpack-cli](https://www.npmjs.com/package/webpack-cli)
- [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)
- [webpack-md5-hash](https://www.npmjs.com/package/webpack-md5-hash)

## Инструкции по запуску:
- Скачать или склонировать репозитори
- Установить зависимости при помощи npm - `npm i`
- Запустить в development режиме - `npm run dev` или
- Запустить сборку production-билда - `npm run build`
