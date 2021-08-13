/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-panel .books-list',
    },
  };

  const templates = {// eslint-disable-line no-unused-vars
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const bookDB = dataSource.books;

  function renderBooks(books){
    console.log('books: ', books);
    for(elem of books){
      const genHTML = templates.menuProduct(elem);
      const genDOM = utils.createDOMFromHTML(genHTML);
      const bookContainer = document.querySelector(select.containerOf.books);
      bookContainer.appendChild(genDOM);
      console.log('genHTML: ', genHTML);

    }
  }

  renderBooks(bookDB);
}
