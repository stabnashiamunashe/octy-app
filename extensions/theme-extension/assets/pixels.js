// PAGE SCROLL EVENT

window.addEventListener("load", function (event) {
  window.addEventListener("scroll", scrollHandler);
});

var is50ScrollFired = false;
var is75ScrollFired = false;
var is100ScrollFired = false;

function scrollHandler() {
  var scrollTop = window.scrollY;
  var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  var scrollPercent = scrollTop / scrollHeight;
  var scrollPercentRounded = Math.round(scrollPercent * 100);

  if (
    !is50ScrollFired &&
    scrollPercentRounded >= 50 &&
    scrollPercentRounded < 75
  ) {
    Shopify.analytics.publish("page_scroll", { percent: 50 });
    is50ScrollFired = true;
  } else if (
    !is75ScrollFired &&
    scrollPercentRounded >= 75 &&
    scrollPercentRounded < 100
  ) {
    Shopify.analytics.publish("page_scroll", { percent: 75 });
    is75ScrollFired = true;
  } else if (!is100ScrollFired && scrollPercentRounded >= 100) {
    Shopify.analytics.publish("page_scroll", { percent: 100 });
    is100ScrollFired = true;
  }
}

// HOOVER EVENT
const productCards = document.querySelectorAll(".product-card__figure");

productCards.forEach((productCard) => {
  let hoverStartTime;

  const octy_tag = productCard.dataset.octyTag;
  productId = octy_tag.slice(5, 17);

  productCard.addEventListener("mouseenter", () => {
    hoverStartTime = new Date().getTime();
  });

  const anchorElement = productCard.querySelector("a");
  anchorElement.addEventListener("click", (e) => {
    const hoverEndTime = new Date().getTime();
    const hoverDuration = hoverEndTime - hoverStartTime;

    if (hoverDuration >= 1000) {
      const alternateImage = productCard.querySelector(
        ".product-card__image--secondary"
      );
      const hasAlternateImage = Boolean(alternateImage);

      Shopify.analytics.publish("product_hover", {
        image_changed_on_hover: hasAlternateImage,
        hover_duration: hoverDuration,
        clicked: true,
        product_id: productId,
      });
    }
  });

  productCard.addEventListener("mouseleave", () => {
    const hoverEndTime = new Date().getTime();
    const hoverDuration = hoverEndTime - hoverStartTime;

    if (hoverDuration >= 1000) {
      const changedOnHover =
        productCard.getAttribute("data-hovered") === "true";
      const alternateImage = productCard.querySelector(
        ".product-card__image--secondary"
      );
      const productForm = productCard.querySelector(
        "form.shopify-product-form"
      );

      Shopify.analytics.publish("product_hover", {
        image_changed_on_hover: changedOnHover,
        hover_duration: hoverDuration,
        product_id: productId,
      });
    }
  });
});

// PRODUCT QUANTITY CHANGE EVENT

const quantitySelector = document.querySelector(".quantity-selector");
const quantityInput = quantitySelector.querySelector(
  ".quantity-selector__input"
);
// const productId = quantitySelector.dataset.productId;

quantityInput.addEventListener("input", () => {
  const quantity = parseInt(quantityInput.value);

  Shopify.analytics.publish("product_quantity_changed", {
    quantity: quantity,
  });
});

// UPDATED HOOVER EVENT

// const productCards = document.querySelectorAll('.product-card');

// productCards.forEach(productCard => {

//   let hoverStartTime;
//   productCardFigure = productCard.querySelector('.product-card__figure');
//   const productId = productCard.querySelector('.product-card__figure').dataset.octyProductId;

//   productCardFigure.addEventListener('mouseenter', () => {
//     hoverStartTime = new Date().getTime();
//   });

//   const anchorElement = productCardFigure.querySelector('a');
//   anchorElement.addEventListener('click', (e) => {
//     const hoverEndTime = new Date().getTime();
//     const hoverDuration = hoverEndTime - hoverStartTime;

//     if (hoverDuration >= 1000) {
//       const alternateImage = productCardFigure.querySelector('.product-card__image--secondary');
//       const hasAlternateImage = Boolean(alternateImage);

//       Shopify.analytics.publish("product_hover", {
//         image_changed_on_hover: hasAlternateImage,
//         hover_duration: hoverDuration,
//         clicked: true,
//         product_data: {
//           product_id: productId,
//           //  product_handle : xxxxxxxxx,
//           //  product_url : xxxxxxxxx,
//         }
//       });
//     }

//     e.preventDefault();
//   });

//   productCardFigure.addEventListener('mouseleave', () => {
//     const hoverEndTime = new Date().getTime();
//     const hoverDuration = hoverEndTime - hoverStartTime;

//     if (hoverDuration >= 1000) {
//       const changedOnHover = productCardFigure.getAttribute('data-hovered') === 'true';
//       const alternateImage = productCardFigure.querySelector('.product-card__image--secondary');
//       const productForm = productCardFigure.querySelector('form.shopify-product-form');

//       Shopify.analytics.publish("product_hover", {
//         image_changed_on_hover: changedOnHover,
//         hover_duration: hoverDuration,
//         product_id: productId,
//       });
//     }
//   });

// });