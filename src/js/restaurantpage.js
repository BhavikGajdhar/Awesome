import { Constants } from "../constants";
const restaurantItems = document.getElementById("restaurant-info-wrapper");
const restaurantsDistanceText = document.querySelector(
  ".restaurant-distance-text"
);
const restaurantsTimePrice = document.querySelector(
  ".restaurant-times-price-wrapper"
);
const restaurantOffersWrapper = document.querySelector(
  ".restaurant-offers-wrapper"
);
const restaurantType = document.querySelector(".restaurant-type");
const restaurantMenuListing = document.querySelector(".menu-listing-wrapper");
const params = new URLSearchParams(window.location.search);
let restaurantId = params.get("restaurantId");
let accordion = true;
let openAccordingIcon;
let closeAccordingIcon;
(async () => {
  const URL = `${Constants.API_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=20.5992349&lng=72.9342451&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;
  const res = await fetch(URL);
  const data = await res.json();
  restaurantItems.innerHTML = `<div>
  <h2 class="restaurant-title">
    ${data.data.cards[0].card.card.info.name}
  </h2>
  <p class="restaurant-cuisines">
  ${data.data.cards[0].card.card.info.cuisines}
  </p>
  <p class="restaurant-area-name">
    ${data.data.cards[0].card.card.info.areaName}
    ${", "}
    ${data.data.cards[0].card.card.info.sla.lastMileTravelString}
  </p>
</div>
<div class="restaurant-rating-wrapper">
  <div class="restaurant-rating">
    <figure class="restaurant-rating-logo">
      <image   src="./src/assets/images/rating_logo.svg" alt="rating" />
    </figure>
    <p class="restaurant-rating-text">
       ${data.data.cards[0].card.card.info.avgRatingString}
    </p>
  </div>
  <hr>
  <p class="restaurant-total-rating-text">
      ${data.data.cards[0].card.card.info.totalRatingsString}
  </p>
</div>
`;
  restaurantsDistanceText.innerHTML =
    data.data.cards[0].card.card.info.feeDetails.message;
  restaurantsTimePrice.innerHTML = `
<div class="restaurant-delivery-time d-flex">
  <figure class="justify-content-center align-item-center d-flex">
    <img class="restaurant-delivery-time-image" src="../src/assets/images/minutes_for_delivery.svg" alt="Delivery Time" />
  </figure>
    <p class="restaurant-times-price-text">
    ${data.data.cards[0].card.card.info.sla.slaString}
    </p>
</div>
<div class="restaurant-avg-price d-flex">
    <figure class="justify-content-center align-item-center d-flex">
      <img class ="restaurant-avg-price-image"src="../src/assets/images/rupees.svg" alt="Delivery Time" />
    </figure>
    <p class="restaurant-times-price-text">
    ${data.data.cards[0].card.card.info.costForTwoMessage}
    </p>
</div>`;

  const restaurantOffers =
    data.data.cards[1].card.card.gridElements.infoWithStyle.offers
      .map((offer) => {
        return `
          <div 
            class="restaurant-offer-card-wrapper">
            <div class="d-flex align-items-center">
              <figure>
                <img
                  class="offer-tag-img" src="${Constants.IMAGE_URL}/${offer.info.offerLogo}" />
              </figure>
              <p class="offer-header-text">
                ${offer.info.header} 
              </p>
            </div>
            <p class="offer-description">
              ${offer.info.couponCode} | ${offer.info.description}
            </p>
          </div>`;
      })
      .join("");

  const restaurantMenuList =
    data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards
      .map((card, index) => {
        if (
          index > 0 &&
          index <
            data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards.length - 2
        ) {
          return`
            <div class="menu-wrapper">
              <div
                class="d-flex justify-content-space-between align-items-center"
              >
                <p class="">
                  ${card.card.card?.title}(${card.card.card.itemCards?.length})
                </p>

                <button class="menu-accordion-icon ">
                  <figure>
                    <img src="./src/assets/images/accordian.svg" />
                  </figure>
                </button>
              </div>
              <div class="food-item-wrapper">
                ${card.card.card.itemCards
                  ?.map((item, index) => {
                    return `
           <div class="d-flex align-items-center justify-content-space-between">
               <div>
                 <h3>${item.card.info.name}</h3>
                 <p> Rs. ${item.card.info.price / 100}</p>
                 <p> ${
                   item.card.info.description ? item.card.info.description : ""
                 }</P>
                </div>
                  <figure>
                     <img class="item-tag-img" src="${Constants.IMAGE_URL}/${
                      item.card.info.imageId
                    }"/>
                  </figure>
            </div>
             <hr class="${
               index < card.card.card.itemCards.length - 1 ? "block" : "none"
             }" />
          `;
                  })
                  .join("")}
              </div>
              <div>
                <div>
                  <hr class="border" />
                </div>
              </div>
            </div>
          `;
        }
      })
      .join("");

  restaurantOffersWrapper.innerHTML = restaurantOffers;
  restaurantMenuListing.innerHTML = restaurantMenuList;
  restaurantType.innerHTML = data.data.cards[2].groupedCard.cardGroupMap.REGULAR
    .cards[0].card.card.isPureVeg
    ? "Pure Veg"
    : "Veg Only";

  openAccordingIcon = document.querySelectorAll(".menu-accordion-icon");
  closeAccordingIcon = document.querySelectorAll(".food-item-wrapper");
  if (data) {
    openAccordingIcon.forEach((icon, index) => {
      icon.addEventListener("click", () => {
        if (accordion) {
          icon.style.transform = "rotate(0deg)";
          closeAccordingIcon[index].style.height = "0px";
          closeAccordingIcon[index].style.overflow = "hidden";
          accordion = false;
        } else {
          icon.style.transform = "rotate(180deg)";
          closeAccordingIcon[index].style.height = "auto";
          closeAccordingIcon[index].style.overflow = "auto";
          accordion = true;
        }
      });
    });
  }
})();
// getRestaurantItems();
