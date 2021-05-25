'use string';

const input = document.getElementById('input-field');
const searchBtn = document.querySelector('.search-btn');
const container = document.querySelector('.container');
const totalPages = document.querySelector('.pages');
const activePage = document.querySelectorAll('.page');
const selType = document.getElementById('select-type');

let currentPage;

const searchMovie = function () {
  console.log(selType.value);
  fetch(
    `http://www.omdbapi.com/?apikey=a3ffd3dd&s=${input.value}&type=${selType.value}&page=${currentPage}`
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      container.innerHTML = '';
      totalPages.innerHTML = '';
      currentPage = 1;

      if (data['Response'] == 'True') {
        for (let i = 0; i < 9; i++) {
          renderList(data.Search[i]);
        }
        console.log(`total results =`, data.totalResults);
        console.log(data);
      } else container.innerHTML = 'Something went wrong!';

      if (data['Response'] == 'True') {
        for (let i = 1; i <= Math.ceil(data.totalResults / 9); i++) {
          renderPages(data.totalResults);
          currentPage++;
        }

        // activePage.classList.add('active-Page');
      }
    })
    .catch(e => {
      console.error('something went wrong, the error is', e.message);
      container.innerHTML = 'Something went wrong!';
      console.log('Something went wrong!', error);
    });
};

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

const renderPages = function () {
  const pages = `<li class="page">${currentPage}</li>`;
  totalPages.insertAdjacentHTML('beforeend', pages);
};
//
searchMovie(input);
searchBtn.addEventListener('click', searchMovie);

input.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();

    searchBtn.click();
  }
});
