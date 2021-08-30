describe('sortMoviesBy unit tests', () => {
  beforeAll(() => {
    movieItems = [
      {
        title: 'Zeta',
        rating: 6,
      },
      {
        title: 'Gamma',
        rating: 9,
      },
      {
        title: 'Alpha',
        rating: 1,
      },
    ]
    
    movieItems.forEach(item => {
      const movieLi = makeMovieEntryLi(item.title, item.rating);
      movieLi.appendTo('ul.movie-list'); 
    });
  }) 

  it('should put the movie li with title Alpha as the first li', () => {
    sortMoviesBy('title');
    expect($('li.movie-li').find('.title').get(0).innerText).toEqual('Alpha');
  })

  it('should sort the movies by top ratings', () => {
    sortMoviesBy('rating', lowToHigh=false);
    expect(parseInt($('li.movie-li').find('.rating').get(0).innerText)).toEqual(9);
  })

  afterAll(() => {
    $('ul').text('');
  })
})