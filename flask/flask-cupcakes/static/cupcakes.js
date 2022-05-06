
const $addCupcakeBtn = $('#add-cupcake-btn');
const $addCupcakeForm = $('#add-cupcake-form');
const $cupcakesContainer = $('#cupcakes-container');

const BASE_URL = '/api';

/**
 * Generates the markup for a cupcake. 
 */
const generateCupcakeMarkup = (cupcake) => {
  return `
    <div class="card cupcake-card m-2 rounded" style="width: 18rem;">
      <img src="${cupcake.image}" class="card-img-top" alt="no image provided">
      <div class="card-body">
        <h5 class="card-title">${cupcake.flavor}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">size - ${ cupcake.size }</li>
        <li class="list-group-item">rating - ${ cupcake.rating }</li>
      </ul>
      <button type="button" class="btn btn-link text-danger delete-cupcake-btn" data-cupcake-id="${cupcake.id}">Delete</button>
    </div>
  `;
}

/**
 * Display current cupcakes in database.
 */
async function putCupcakesOnPage() {
  try {
    const res = await axios({
      url: `${BASE_URL}/cupcakes`,
      method: "GET",
    });

    for (const cupcake of res.data.cupcakes) {
      const cupcakeMarkup = generateCupcakeMarkup(cupcake);
      $cupcakesContainer.append(cupcakeMarkup);
    }
  }
  catch (err) {
    console.log(err)
  }
}

/**
 * Send a post request to add a new cupcake from add cupcake form data. 
 */
async function addCupcake(evt) {
  try {
    evt.preventDefault();
  
    // get inputs from form
    const flavor = $("#cupcake-flavor").val();
    const size = $("#cupcake-size").val();
    const rating = Number($("#cupcake-rating").val());
    const image = $("#cupcake-image-url").val() ? $("#cupcake-image-url").val() : null;

    const res = await axios({
      url: `${BASE_URL}/cupcakes`,
      method: "POST",
      data: {
        flavor, size, rating, image
      }
    });

    // get cupcake data from API response
    const cupcake = res.data.cupcake;

    // create markup from cupcake data and append to the cupcakes container on the page
    $cupcakesContainer.append(generateCupcakeMarkup(cupcake));

    $addCupcakeForm.trigger('reset');

  }
  catch (error) {
    console.log(error)
  }
}

$addCupcakeForm.on("submit", addCupcake);


/**
 * Send a DELETE request to delete the cupcake with the given id.
 */
async function deleteCupcake() {
  const cupcakeId = $(this).data('cupcake-id')

  await axios({
    url: `${BASE_URL}/cupcakes/${cupcakeId}`,
    method: "DELETE",
  });

  $(this).parent().remove();
}

$cupcakesContainer.on('click', '.delete-cupcake-btn', deleteCupcake);

$(putCupcakesOnPage);
