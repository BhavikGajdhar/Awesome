import { Constants } from "../constants";

const banner_images_wrapper = document.getElementById("banner_images");
const whats_on_mind_images_wrapper = document.getElementById(
  "whats-on-mind-images-wrapper"
);
const top_restaurant_card_wrapper = document.getElementById(
  "top-restaurant-card-wrapper"
);
const restaurants_cards_wrapper = document.getElementById(
  "restaurants-cards-wrapper"
);
const leftArrow = document.querySelector(".left-arrow-btn");
const rightArrow = document.querySelector(".right-arrow-btn");
(async () => {
  const URL = `${Constants.API_URL}/restaurants/list/v5?lat=20.5992349&lng=72.9342451&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  const res = await fetch(URL);
  const data = await res.json();
  const bannerImages =
    data.data.cards[0].card.card.gridElements.infoWithStyle.info
      .map(
        (info) =>
          `<a
            class="banner-image"
            href="./detailpage.html?collection=${info.entityId}"
            ><figure>
              <img
                class="banner-image-img"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/${info.imageId}"
              /></figure
          ></a>`
      )
      .join("");
  const whats_on_mind_images =
    data.data.cards[1].card.card.gridElements.infoWithStyle.info
      .map(
        (info) =>
          `<a class="whats-on-mind-image" href="./detailpage.html?collection=${new URLSearchParams(
            info.action.link.split("?")[1]
          ).get(
            "collection_id"
          )}"><figure ><img class="whats-on-mind-image-img" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/${
            info.imageId
          }"/></figure></a>`
      )
      .join("");
  const restaurants_cards =
    data.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
      .map(
        (restaurant) =>
          ` <a class="text-decoration-none" href="./restaurantpage.html?restaurantId=${
            restaurant.info.id
          }"> <div class="restaurant-card">
        <figure class="restaurant-card-image">
          <img
            class="restaurant-card-image-img"
            src="${Constants.IMAGE_URL}/${restaurant.info.cloudinaryImageId}"/>
            alt=""
          />
        </figure>
        <div class="restaurant-card-body">
          <h3 class="restaurant-card-body-title">
          ${restaurant.info.name}
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
              restaurant.info.avgRating
            }</p>
          </div>
          <p class="restaurant-card-body-cuisines">
          ${restaurant.info.cuisines.map((cuisine) => cuisine)}
          </p>
          <p class="restaurant-card-body-area">${restaurant.info.areaName}</p>
        </div>
      </div>
      </a>
        `
      )
      .join("");
  const top_restaurant_card =
    data.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
      .map(
        (restaurant) =>
          `  <a class="text-decoration-none top-restaurant-card"  href="./restaurantpage.html?restaurantId=${
            restaurant.info.id
          }"> <div >
        <figure class="top-restaurant-card-image">
          <img
            class="top-restaurant-card-image-img"
            src="${Constants.IMAGE_URL}/${restaurant.info.cloudinaryImageId}"/>
            alt=""
          />
        </figure>
        <div class="top-restaurant-card-body">
          <h3 class="top-restaurant-card-body-title">
          ${restaurant.info.name}
          </h3>
          <div class="top-restaurant-card-body-rating">
            <figure>
              <img
                class="top-restaurant-card-body-rating-logo"
                src="./src/assets/images/rating_logo.svg"
                alt="rating"
              />
            </figure>
            <p class="top-restaurant-card-body-rating-text">${
              restaurant.info.avgRating
            }</p>
          </div>
          <p class="top-restaurant-card-body-cuisines">
          ${restaurant.info.cuisines.map((cuisine) => cuisine)}
          </p>
          <p class="top-restaurant-card-body-area">${
            restaurant.info.areaName
          }</p>
        </div>
      </div>
      </a>
        `
      )
      .join("");
  banner_images_wrapper.insertAdjacentHTML("afterbegin", bannerImages);
  whats_on_mind_images_wrapper.insertAdjacentHTML(
    "afterbegin",
    whats_on_mind_images
  );
  top_restaurant_card_wrapper.insertAdjacentHTML(
    "afterbegin",
    top_restaurant_card
  );
  restaurants_cards_wrapper.insertAdjacentHTML("afterbegin", restaurants_cards);
})();

leftArrow.addEventListener("click", () => {
  banner_images_wrapper.scrollLeft -= 500;
});
rightArrow.addEventListener("click", () => {
  banner_images_wrapper.scrollLeft += 500;
});
// getHomeData();
