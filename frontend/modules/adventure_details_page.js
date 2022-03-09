import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let adventureId = new URLSearchParams(search).get("adventure");

  return adventureId;

  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId
    );
    const adventureData = await res.json();
    return adventureData;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  let divGallery = document.getElementById("photo-gallery");

  adventure.images.map((advImage) => {
    let divImage = document.createElement("div");
    divImage.className = "col-12";
    divImage.setAttribute("id", "imageGallery");
    divImage.innerHTML = `
        <img class="img-responsive activity-card-image" src=${advImage} />
      `;
    divGallery.appendChild(divImage);
  });

  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let iCount = 0;
  let divGallery = document.getElementById("photo-gallery");
  divGallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner col-12" id = "carousel-slides">
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
  `;

  let divCarousel = document.getElementById("carousel-slides");

  images.map((key) => {
    let divNew = document.createElement("div");
    if (iCount === 0) {
      divNew.className = "carousel-item active";
      divNew.innerHTML = `
      <img class="img-responsive activity-card-image" src="${key}" alt="First slide">
      `;
      iCount = 1;
    } else {
      divNew.className = "carousel-item";
      divNew.innerHTML = `
      <img class="img-responsive activity-card-image" src="${key}" alt="First slide">
      `;
    }
    divCarousel.appendChild(divNew);
  });
  //divGallery.appendChild(divParentCarousel);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = totalCost;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmit(adventure,search) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let id = adventure.id;
 
  let url = config.backendEndpoint + "/reservations/new";
  async function makeRequest(data) {
    let result = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(data)
    });
    let response = await result.json();
    return response;
  }
  let form = document.getElementById("myForm");

  form.addEventListener("submit",(e,search)=>{
    e.preventDefault();
    let name = form.elements["name"].value;
    let date = Date(form.elements["date"].value);
    let person = form.elements["person"].value;
    let adventure = id;
    const data ={
      name,
      date,
      person, 
      adventure,
    }
    console.log("data"+data);

    makeRequest(data).then((response) => {
    alert("Success!")
      console.log("response", response);
    });
  });
  // async function makeRequest (data){
  //   let result=await fetch(url,{
  //     method: "POST",
  //         body: JSON.stringify(data)
  //   });
  //   let response = await result.json();
  //       return response;
  // }

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
