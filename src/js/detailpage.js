import { Constants } from "../constants";
const detailPage = document.getElementById("restaurants-cards-wrapper");
const restaurantsHeading = document.getElementById("restaurants-heading");
const params = new URLSearchParams(window.location.search);
let collectionId = params.get("collection");

const getDetailData = async () => {
  const URL = `${Constants.API_URL}/v5?lat=20.5992349&lng=72.9342451&collection=${collectionId}&tags=layout_ux4&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
  const res = await fetch(URL);
  const data = await res.json();
  const top_restaurant_card = data.data.cards
    .map((restaurant) => {
      if (data.data.cards.indexOf(restaurant) > 2) {
        return `  <div class="restaurant-card">
            <figure class="restaurant-card-image">
              <img
                class="restaurant-card-image-img"
                src="${Constants.IMAGE_URL}/${
          restaurant.card.card.info.cloudinaryImageId
        }"/>
                alt=""
              />
            </figure>
            <div class="restaurant-card-body">
              <h3 class="restaurant-card-body-title">
              ${restaurant.card.card.info.name}
              </h3>
              <div class="restaurant-card-body-rating">
                <figure>
                  <img
                    class="restaurant-card-body-rating-logo"
                    src="./src/assets/images/rating_logo.svg"
                    alt="rating"
                  />
                </figure>
                <p class="restaurant-card-body-rating-text">${
                  restaurant.card.card.info.avgRating
                }</p>
              </div>
              <p class="restaurant-card-body-cuisines">
              ${restaurant.card.card.info.cuisines.map((cuisine) => cuisine)}
              </p>
              <p class="restaurant-card-body-area">${
                restaurant.card.card.info.areaName
              }</p>
            </div>
          </div>
            `;
      }
    })
    .join("");

  detailPage.insertAdjacentHTML("afterbegin", top_restaurant_card);
  restaurantsHeading.innerHTML = data.data.cards[0].card.card.title;
};
getDetailData();
