const banner_images_wrapper = document.getElementById("banner_images");
const whats_on_mind_images_wrapper = document.getElementById(
  "whats_on_mind_images_wrapper"
);
const top_restaurant_card_wrapper = document.getElementById(
  "top_restaurant_card_wrapper"
);
const restaurants_cards_wrapper = document.getElementById(
  "restaurants_cards_wrapper"
);
const getHomeData = async () => {
  const URL =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.5992349&lng=72.9342451&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
  const res = await fetch(URL);
  const data = await res.json();
  const bannerImages =
    data.data.cards[0].card.card.gridElements.infoWithStyle.info
      .map(
        (info) =>
          `<a class="banner_image"  onclick="load_detailPage(${info.entityId})"><figure ><img class="banner_image_img" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/${info.imageId}"/></figure></a>`
      )
      .join("");
  const whats_on_mind_images =
    data.data.cards[1].card.card.gridElements.infoWithStyle.info
      .map(
        (info) =>
          `<a class="whats_on_mind_image"  onclick="load_detailPage(${new URLSearchParams(info.action.link.split("?")[1]).get("collection_id")})"><figure ><img class="whats_on_mind_image_img" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/${info.imageId}"/></figure></a>`
      )
      .join("");
  const restaurants_cards =
    data.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
      .map(
        (restaurant) =>
          `  <div class="restaurant_card">
        <figure class="restaurant_card_image">
          <img
            class="restaurant_card_image_img"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/${
              restaurant.info.cloudinaryImageId
            }"/>
            alt=""
          />
        </figure>
        <div class="restaurant_card_body">
          <h3 class="restaurant_card_body_title">
          ${restaurant.info.name}
          </h3>
          <div class="restaurant_card_body_rating">
            <figure>
              <img
                class="restaurant_card_body_rating_logo"
                src="./src/assets/images/rating_logo.svg"
                alt="rating"
              />
            </figure>
            <p class="restaurant_card_body_rating_text">${
              restaurant.info.avgRating
            }</p>
          </div>
          <p class="restaurant_card_body_cuisines">
          ${restaurant.info.cuisines.map((cuisine) => cuisine)}
          </p>
          <p class="restaurant_card_body_area">${restaurant.info.areaName}</p>
        </div>
      </div>
        `
      )
      .join("");
  const top_restaurant_card =
    data.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
      .map(
        (restaurant) =>
          `  <div class="top_restaurant_card">
        <figure class="top_restaurant_card_image">
          <img
            class="top_restaurant_card_image_img"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/${
              restaurant.info.cloudinaryImageId
            }"/>
            alt=""
          />
        </figure>
        <div class="top_restaurant_card_body">
          <h3 class="top_restaurant_card_body_title">
          ${restaurant.info.name}
          </h3>
          <div class="top_restaurant_card_body_rating">
            <figure>
              <img
                class="top_restaurant_card_body_rating_logo"
                src="./src/assets/images/rating_logo.svg"
                alt="rating"
              />
            </figure>
            <p class="top_restaurant_card_body_rating_text">${
              restaurant.info.avgRating
            }</p>
          </div>
          <p class="top_restaurant_card_body_cuisines">
          ${restaurant.info.cuisines.map((cuisine) => cuisine)}
          </p>
          <p class="top_restaurant_card_body_area">${
            restaurant.info.areaName
          }</p>
        </div>
      </div>
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
};

function load_detailPage(entityId) {
  window.location.href = `./detailPage.html?collection=${entityId}`;
}

getHomeData();
