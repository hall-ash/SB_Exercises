$('form').on('submit', function(evt) {
  evt.preventDefault();

  const $title = $('#title-input');
  const $rating = $('#rating-input');
  const titleCharMin = 2;

  if ($title.val().length < titleCharMin) {
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
    
    let propA = $(itemA).find(`.${propToSortBy}`).get(0).innerText;
    let propB = $(itemB).find(`.${propToSortBy}`).get(0).innerText;
 
    if (parseInt(propA)) { propA = parseInt(propA); }
    if (parseInt(propB)) { propB = parseInt(propB); }

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

 $('#title-sort-btn').on('click', () => sortMoviesBy('title'));

 $('#rating-sort-btn').on('click', () => sortMoviesBy('rating', false));




