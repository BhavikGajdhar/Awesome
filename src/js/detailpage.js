const detailPage = document.getElementById("restaurants_cards_wrapper");
const restaurantsHeading = document.getElementById("restaurants_heading");
const params = new URLSearchParams(window.location.search);
let collectionId = params.get("collection");

const getDetailData = async () => {
  const URL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.5992349&lng=72.9342451&collection=${collectionId}&tags=layout_ux4&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
  const res = await fetch(URL);
  const data = await res.json();
  console.log(data);
  const top_restaurant_card = data.data.cards
    .map((restaurant) => {
        // console.log(data.data.cards.indexOf(restaurant),"hsjdhs");
      if (data.data.cards.indexOf(restaurant) > 2) {
        return`  <div class="restaurant_card">
            <figure class="restaurant_card_image">
              <img
                class="restaurant_card_image_img"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/${
                  restaurant.card.card.info.cloudinaryImageId
                }"/>
                alt=""
              />
            </figure>
            <div class="restaurant_card_body">
              <h3 class="restaurant_card_body_title">
              ${restaurant.card.card.info.name}
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
                  restaurant.card.card.info.avgRating
                }</p>
              </div>
              <p class="restaurant_card_body_cuisines">
              ${restaurant.card.card.info.cuisines.map((cuisine) => cuisine)}
              </p>
              <p class="restaurant_card_body_area">${
                restaurant.card.card.info.areaName
              }</p>
            </div>
          </div>
            `;
      }
    })
    .join("");

  detailPage.insertAdjacentHTML("afterbegin", top_restaurant_card);
  restaurantsHeading.innerHTML= data.data.cards[0].card.card.title;
};
getDetailData();
// detailPage.insertAdjacentHTML("afterbegin", `<h1>Bhavik Gajdhar</h1>`);
