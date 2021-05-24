'use string';

// що-до сторінок, то в юрл можно дописати '&page='
// в data.totalResults  у тебе лежать скільки всього результатів,
// data.totalResults / 10 = кількість сторінок, щоб до другої достучатися міняєш тут юрл
//  fetch(`http://www.omdbapi.com/?apikey=a3ffd3dd&s=${input.value}&page=2`)

// reference here https://github.com/shettynitin667/MovieWiki/blob/master/index.js

const input = document.getElementById('input-field');
const searchBtn = document.querySelector('.search-btn');
const container = document.querySelector('.container');
const totalPages = document.querySelector('.pages');

const searchMovie = function () {
  fetch(`http://www.omdbapi.com/?apikey=a3ffd3dd&s=${input.value}&page=`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      container.innerHTML = '';
      if (data['Response'] == 'True') {
        for (let i = 0; i < 9; i++) {
          renderList(data.Search[i]);
          console.log(data.Search[i].Title, data.Search[i].Year);
        }
        console.log(`total results of movies =`, data.totalResults);
        console.log(data);
      }
      if (data['Response'] == 'True') {
        for (let i = 1; i == data.totalResults / 10; i++) {
          renderPages(data.totalResults[i]);
        }
      }
    })
    .catch(e => {
      console.error('something went wrong, the error is', e.message);
      container.innerHTML = 'Something went wrong!';
      console.log('Something went wrong!', error);
    });
};
searchMovie(input);
searchBtn.addEventListener('click', searchMovie);
///
const renderList = function (data) {
  const html = `
            <article class="movie">
                <img class="movie__poster" src="${data.Poster}" />
                <div class="movie__info"><div>
                <h3 class="movie__name">${data.Title}</h3>
                <h4 class="movie__year">Year: ${data.Year}</h4></div>
                <div class="movie__details">
                <p class="movie__type">Type: ${data.Type}</p>
                <button class="details-btn">DETAILS</button>
              </div>
                </div>
            </article>
            `;
  container.insertAdjacentHTML('beforeend', html);
};

const renderPages = function (data) {
  const pages = `<li class="page">${data.totalResults}</li>`;
  totalPages.insertAdjacentHTML('beforeend', pages);
};

input.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();

    searchBtn.click();
  }
});

// if (data['Response'] == 'True') {
//   for (let i = 1; i <= Math.ceil(totalResults / 10); i++) {
//     renderPages(data.totalPages);
//   }
// }

// const renderPages = function (data.totalResults) {
//   const pages = `<li class="page">${i}</li>`;
//   totalPages.insertAdjacentHTML('beforeend', pages);
// };
