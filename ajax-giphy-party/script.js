console.log("Let's get this party started!");
console.log('hello');

const BASE_SEARCH_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';
const api_key = 'wII9q9eZn9PfjEcanvMpLgOTcSurfRfa';


async function getGif() {
  try {

    // get search query
    const q = $('#search-input').val();
    if (!q) {
      alert('Enter a search term!');
      return;
    }
    $('#search-input').val(''); // clear query input

    // returns an array of 50 gifs, indexed at 0
    const res = await axios.get(BASE_SEARCH_ENDPOINT, { params: { q, api_key } });

    // choose a random a gif between 0 and 49 and get its url
    const { data: gifs } = res.data;
    const url = gifs[Math.floor(Math.random() * 50)].images.original.url; 
    //const url = gifs[0].images.original.url;
    
    // append gif to gif-container
    $('#gif-container').append(createImg(url));
  
  } catch(err) {
    console.log(err);
  }
}

const createImg = (path) => {
  const img = new Image();
  img.src = path;
  img.alt = 'gif';
  img.classList.add('img-fluid');
  return img;
}

$('form').on('submit', function(evt) {
  evt.preventDefault();
  getGif();
});

// $('form').submit(function(evt) {
//   evt.preventDefault();
//   console.log('clicked');
//   getGif();
// })


$('#remove-gifs-btn').on('click', () => $('#gif-container').text(''));
