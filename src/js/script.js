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

  const settings = {
    rating: {
      A: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)',
      B: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)',
      C: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)',
      D: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)',
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
    let i = 0;
    for(const elem of books){
      i++;
      const genHTML = templates.menuProduct(elem);
      const genDOM = utils.createDOMFromHTML(genHTML);
      const booksContainer = document.querySelector(select.containerOf.books);
      booksContainer.appendChild(genDOM);

      const divR = document.querySelector('[rating-id=\"' + i +'\"]');
      const rating = elem.rating;
      const divWidth = rating * 10;
      console.log('divR: ', settings.rating.two);
      //divR.style.backgroundColor = 'red';
      if(rating<=6){
        divR.style.background = settings.rating.A;
      }
      else if(rating>6 && rating<=8){
        divR.style.background = settings.rating.B;
      }
      else if(rating>8 && rating<=9){
        divR.style.background = settings.rating.C;
      }
      else {
        divR.style.background = settings.rating.D;
      }
      divR.style.width = divWidth+'%';

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
