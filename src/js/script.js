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
      form: '.filters form',
    },
  };

  const templates = {// eslint-disable-line no-unused-vars
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const bookDB = dataSource.books;
  const favouriteBooks = [],
    filters = [];


  renderBooks(bookDB);
  initActions();

  function renderBooks(books){
    //console.log('books: ', books);
    for(const elem of books){
      const genHTML = templates.menuProduct(elem);
      const genDOM = utils.createDOMFromHTML(genHTML);
      const booksContainer = document.querySelector(select.containerOf.books);
      booksContainer.appendChild(genDOM);

    }
  }


  function initActions(){
    const booksContainer = document.querySelector(select.containerOf.books);


    booksContainer.addEventListener('click', function(e){
      e.preventDefault();
    });

    booksContainer.addEventListener('dblclick', function(e){
      e.preventDefault();
      const parent = e.target.offsetParent;

      if (parent.classList.contains('book__image')){

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


    });

    const formContainer = document.querySelector(select.containerOf.form);

    //console.log('booksContainer ', booksContainer)

    formContainer.addEventListener('click', function(e){
      const elem = e.target;

      if(elem.tagName == 'INPUT' && elem.type == 'checkbox' && elem.name == 'filter'){
        if(elem.checked == true && !filters.includes(elem.value)){
          filters.push(elem.value);
        }
        else if(elem.checked == false && filters.includes(elem.value)){
          filters.splice(filters.indexOf(elem.value), 1);
        }
        //console.log('filters: ', filters);
        chkFilters();

      }


    });


  }


  function chkFilters(){
    //console.log('test');
    const arr = [];

    for(j in dataSource.books){
      arr.push(parseInt(j)+1);
    }
    const arrLength = arr.length;



    for(i in dataSource.books){
      //console.log('book: ', dataSource.books[i].details.nonFiction);
      const nf = dataSource.books[i].details.nonFiction;
      const ad = dataSource.books[i].details.adults;
      const bookId = dataSource.books[i].id;
      const index = arr.indexOf(bookId);



      let filtAd = false,
        filtNf = false;

      if(filters.includes('adults')){
        filtAd = true;
      }

      if(filters.includes('nonFiction')){
        filtNf = true;
      }

      //console.log('filtAd, filtNf: ', filtAd, filtNf);

      if(filtAd == true && filtNf == true){
        if(ad == filtAd && nf == filtNf){
          arr.splice(index, 1);
        }
      }
      else if(filtAd == true && filtNf == false){
        if(ad){
          arr.splice(index, 1);
        }
      }
      else if(filtAd == false && filtNf == true){
        if(nf){
          arr.splice(index, 1);
        }
      }
      else{
        //console.log('none!');
        arr.splice(index, 1);
      }


    }

    for(k=1; k<=arrLength; k++){

      const bookDom = document.querySelector('[data-id=\"' + k +'\"]');

      if(arr.includes(k)){
        bookDom.classList.add('hidden');
      }
      else {
        bookDom.classList.remove('hidden');
      }

    }


  }


}
