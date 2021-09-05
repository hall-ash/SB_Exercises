
const BASE_ENDPOINT = 'https://api.tvmaze.com'

// default image if no image exists for show
const DEFAULT_IMG_PATH = 'https://images.unsplash.com/photo-1609743522653-52354461eb27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default image if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
 
  try {
  
    // get all shows that match the query
    const res = await axios.get(BASE_ENDPOINT + '/search/shows', { params: { q: query } });
   
    // returns array of shows matching query in order of relevancy
    // best matching show is at index 0
    //const { id, name, summary, image } = res.data[0].show;
    
    const shows = res.data.map(curShow => {
      const { id, name, summary, image } = curShow.show
      return {
        id,
        name,
        summary,
        image: image.original ? image.original : DEFAULT_IMG_PATH
      }
    })
  
    return shows;

  } catch(err) {
    console.log(err);
    alert('There was a problem retrieving your show!');
  }
  
  
}


/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (const show of shows) {
    const $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}" data-show-name="${show.name}">
         <div class="card" data-show-id="${show.id}" data-show-name="${show.name}">
          <img class="card-img-top" src="${show.image}" alt="Show image">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
           <div class="card-footer">
           </div>
         </div>
       </div>
      `);

    // add the episodes button to the card footer
    $cardFooter = $item.find('.card-footer');
    createEpisodeBtn().appendTo($cardFooter);

    $showsList.append($item);
  }
}

const createEpisodeBtn = () => {
  try {
    const $btn = $('<button type="button" class="btn btn-info btn-episode" data-toggle="modal" data-target="#episodesModal">Episodes</button>');
    
    $btn.on('click', async function handleEpisodeBtn(evt) {

      // get show name and id from card data
      const showCard = $(this).parent().parent()[0];
      const { showName, showId } = showCard.dataset;
      
      // find episodes from show id
      const episodes = await getEpisodes(showId);

      // get episodes list
      $episodesList = populateEpisodes(episodes);

      // add show name to modal title
      $('#episodesModal').find('.modal-title').text(`${showName} Episodes`);

      // get episodesModal's body
      const $modalBody = $('#episodesModal').find('.modal-body');

      // clear modal-body of list from previous show
      $modalBody.empty();

      // add list of current show's episodes to modal body
      $modalBody.append($episodesList);

    });
  
    return $btn;

  } 
  catch(err) {
    console.log(err);
  }
  
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  
  try {

    evt.preventDefault();

    const query = $("#search-query").val();
    if (!query) return;
  
    const shows = await searchShows(query);
  
    populateShows(shows);

  }
  catch(err) {
    console.log(err);
  }
  
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {

  try {

    const res = await axios.get(BASE_ENDPOINT + `/shows/${id}/episodes`);

    const episodes = res.data.map(episode => {
      const { id, name, season, number } = episode;
      return {
        id,
        name,
        season,
        number,
      }
    });

    return episodes;

  }
  catch(err) {
    console.log(err);
  }
  
}

function populateEpisodes(episodes) {
  const $episodesList = $('<ol id="episodes-list"></ol>');

  for (const episode of episodes) {
    const $item = $(
      `
      <li data-episode-id="${episode.id}">
        ${episode.name} (season ${episode.season}, episode ${episode.number})
      </li>
      `);

    $episodesList.append($item);
  }

  return $episodesList;
}

