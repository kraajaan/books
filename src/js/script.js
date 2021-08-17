/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-panel .books-list',
      book: 'a.book__image',
      bookImg: '.books-list .book img',
    },
  };

  const templates = {// eslint-disable-line no-unused-vars
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const bookDB = dataSource.books;
  const favouriteBooks = [];


  renderBooks(bookDB);
  initActions();

  function renderBooks(books){
    //console.log('books: ', books);
    for(const elem of books){
      const genHTML = templates.menuProduct(elem);
      const genDOM = utils.createDOMFromHTML(genHTML);
      const booksContainer = document.querySelector(select.containerOf.books);
      booksContainer.appendChild(genDOM);
      //console.log('elem: ', elem);

    }
  }


  function initActions(){
    const bookContainer = document.querySelectorAll(select.containerOf.book);
    //console.log('bookContainer[elem]: ', bookContainer[elem]);

    for(const elem of bookContainer){
      const a1 = elem.getAttribute('data-id');

      //console.log('elem: ', elem);
      //console.log('a1: ', a1);

      elem.addEventListener('dblclick', function(){
        event.preventDefault();

        if(favouriteBooks.includes(a1)){
          const index = favouriteBooks.indexOf(a1);
          favouriteBooks.splice(index, 1);
          elem.classList.remove('favorite');
        }
        else{
          favouriteBooks.push(a1);
          elem.classList.add('favorite');
        }


        console.log('dblclick!');
        //console.log('data-id: ', a1);
        console.log('favouriteBooks: ', favouriteBooks);
      });
    }



  }


}
