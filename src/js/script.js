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
    //const bookContainer = document.querySelectorAll(select.containerOf.book);
    //console.log('bookContainer[elem]: ', bookContainer[elem]);
    const booksContainer = document.querySelector(select.containerOf.books);

    //console.log('booksContainer ', booksContainer)

    booksContainer.addEventListener('click', function(e){
      e.preventDefault();
    });

    booksContainer.addEventListener('dblclick', function(e){
      e.preventDefault();
      //console.log('event.target: ', event.target);
      //console.log('e.target: ', e.target);
      //console.log('e.target.offsetParent: ', e.target.offsetParent);
      const parent = e.target.offsetParent;
      //console.log('parent.classList: ', parent.classList);
      if (parent.classList.contains('book__image')){
        //console.log('passed');
        const dataId = parent.getAttribute('data-id');
        if(favouriteBooks.includes(dataId)){
          const index = favouriteBooks.indexOf(dataId);
          favouriteBooks.splice(index, 1);
          parent.classList.remove('favorite');
        }
        else {
          favouriteBooks.push(dataId);
          parent.classList.add('favorite');
        }


      }

      console.log('favouriteBooks: ', favouriteBooks);




    });


  }


}
