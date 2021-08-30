$('form').on('submit', function(evt) {
  evt.preventDefault();

  const $title = $('#title-input');
  const $rating = $('#rating-input');
  const titleCharMin = 2;

  if ($title.val().length <= titleCharMin) {
    alert('Movie title needs at least 2 characters!');
    $title.val('');
    return;
  }

  if (!$rating.val()) {
    alert('Add a movie rating!');
    return;
  }
  
  // make the movie entry li and append to ul
  makeMovieEntryLi($title.val(), $rating.val()).appendTo('ul');

  // clear inputs
  $title.val('');
  $rating.val(''); 
});

const makeMovieEntryLi= (title, rating) => {
  const $movieLi = $('<li class="movie-li"></li>');

  const $titleDiv = $(`<div class="title-container">Title: <span class="title">${title}</span></div>`);
  const $ratingDiv = $(`<div class="rating-container">Rating: <span class="rating">${rating}</span></div>`);

  // append title and rating to movie li
  $titleDiv.appendTo($movieLi);
  $ratingDiv.appendTo($movieLi);

  // create remove button for li
  const $removeBtn = $('<button>x</button>');
  $removeBtn.appendTo($movieLi);
  $removeBtn.on('click', function() {
    $(this).parent().remove();
  })
  
  return $movieLi;
} 


const sortMoviesBy = (propToSortBy, lowToHigh=true) => {
  // sort movie list items 
  const movieLis = [...$('.movie-li')].sort((itemA, itemB) => {
    
    const propA = $(itemA).find(`.${propToSortBy}`).get(0).innerText;
    const propB = $(itemB).find(`.${propToSortBy}`).get(0).innerText;

    if (propA < propB) {
      return lowToHigh ? -1 : 1; 
    }
    if (propA > propB) {
      return lowToHigh ? 1 : -1;
    }
    return 0;
  })

   // clear unordered list
   $unorderedMovieList = $('ul.movie-list');
   $unorderedMovieList.text('');
 
   // add ordered movie list items
   movieLis.map(item => $(item).appendTo($unorderedMovieList));
}

 $('#title-sort-btn').on('click', function (evt) {
   console.log(evt.target);
   const $svg = $(evt.target).find('svg');

   if ($svg.attr('class').includes('bi-sort-up')) {
    // $svg = $(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down-alt" viewBox="0 0 16 16">
    // <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
    // </svg>`)
    console.log('hi')
    sortMoviesBy('title')
    $svg.removeClass('bi bi-sort-up');
    $svg.addClass('bi bi-sort-down');
    console.log(evt.target);
    // evt.target.innerText = " Z-A ";
   }
   if ($svg.attr('class').includes('bi-sort-down')) {
    sortMoviesBy('title', lowToHigh=false);
    $svg.removeClass('bi bi-sort-down');
    $svg.addClass('bi bi-sort-up');
    // evt.target.innerText = " A-Z ";
   }
   
 });
 $('#rating-sort-btn').on('click', () => sortMoviesBy('rating', lowToHigh=false));




