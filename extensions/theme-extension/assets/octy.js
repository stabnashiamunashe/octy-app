window.addEventListener("createupdate_complete", (e) => {
  const url = new URL(window.location);

  url.searchParams.append("section_id", "octy-product-recommendations");

  url.searchParams.append("octy-customer-id", e.detail.octy_customer_id);
  url.searchParams.append("variant", generateRandom14DigitNumber());
  url.searchParams.append("cache", "false");

  const urlString = url.toString();

  fetchRecommendationSection(urlString);
});

async function fetchRecommendationSection(urlString) {
  let response = await fetch(urlString);

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  let responseText = await response.text();

  let htmlMarkup = new DOMParser()
    .parseFromString(responseText, "text/html")
    .querySelector("#shopify-section-octy-product-recommendations").innerHTML;

  let recommendationBlock = document.getElementById("octy-prod-rec");

  console.log(recommendationBlock);
  recommendationBlock.innerHTML = htmlMarkup;
}

function generateRandom14DigitNumber() {
  let num = Math.floor(Math.random() * 9) + 1;
  for (let i = 0; i < 13; i++) {
    num = num * 10 + Math.floor(Math.random() * 10);
  }
  return num;
}

window.addEventListener("octy:gift_coupon", (e) => {
  const url = new URL(window.location);

  url.searchParams.append("section_id", "octy-gift-card");

  url.searchParams.append("octy-coupon-code", e.detail.octy_coupon_code);
  url.searchParams.append("variant", generateRandom14DigitNumber());
  url.searchParams.append("cache", "false");

  const urlString = url.toString();

  console.log(` String URL: ${urlString}`);

  fetchGiftSection(urlString);
});

async function fetchGiftSection(urlString) {
  let response = await fetch(urlString);

  console.log(`Response Text: ${response.text}`);
  console.log(`Response Status: ${response.status}`);

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  let responseText = await response.text();

  let giftHtmlMarkup = new DOMParser()
    .parseFromString(responseText, "text/html")
    .querySelector("#shopify-section-octy-gift-card").innerHTML;

  console.log(responseText);

  let giftBlock = document.getElementById("gifts-octy");

  console.log("Printing out giftBlock");
  console.log(giftBlock);

  giftBlock.innerHTML = giftHtmlMarkup;
  showOverlay();
}

function showOverlay() {
  var overlay = document.getElementById("customPopupOverlay");
  overlay.style.display = "flex";
  overlay.style.background = "rgba(0, 0, 0, 0.5)";
  overlay.style.backdropFilter = "blur(5px)";
}

function closeOverlay() {
  var overlay = document.getElementById("customPopupOverlay");
  overlay.style.display = "none";
}

function copyPromoCode() {
  console.log("Now attempting to copy discount Code");
  var promoCodeElement = document.querySelector(".promo-code");
  var promoCode = promoCodeElement.innerText || promoCodeElement.textContent;

  var textarea = document.createElement("textarea");
  textarea.value = promoCode;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  alert("Discount code copied to clipboard: " + promoCode);
}

// Function to establish the WebSocket connection
const serverUrl = "wss://late-pandas-say.loca.lt/";

const establishWebSocketConnection = () => {
  const is_connection_available = localStorage.getItem("octy_ica");
  const octy_customer_id = localStorage.getItem("octy_customer_id");

  if (is_connection_available) {
    console.log("We have already existing connection");
    socket = new WebSocket(serverUrl + octy_customer_id);

    socket.addEventListener("message", (event) => {
      console.log("Message from server:", event.data);

      const message = JSON.parse(event.data);

      if (message.type === "coupon") {
        console.log("Received coupon code:", message.couponCode);

        // todo (morning of 16 December 2023): trigger custom event by updating a value in localStorage so octy-polling.js can pick up the change instead of making use of the window.dispatchEvent(event); as we don't have access to the window object in shopify web pixels strict sandbox
        const event = new CustomEvent("octy:gift_coupon", {
          detail: { octy_coupon_code: message.couponCode },
        });
        window.dispatchEvent(event);
      }
    });
  } else {
    console.log("We are creating a new connection");
    socket = new WebSocket(serverUrl + octy_customer_id);

    socket.addEventListener("open", (event) => {
      console.log("This is from Web Pixels");
      localStorage.setItem("octy_ica", true);
      console.log("WebSocket connection opened:", event);
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server:", event.data);

      const message = JSON.parse(event.data);

      if (message.type === "coupon") {
        console.log("Received coupon code:", message.couponCode);

        const event = new CustomEvent("octy:gift_coupon", {
          detail: { octy_coupon_code: message.couponCode },
        });
        window.dispatchEvent(event);
      }
    });

    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    socket.addEventListener("close", (event) => {
      localStorage.setItem("octy_ica", false);
    });
  }
};

establishWebSocketConnection();

// Polling

let lastPollTimestamp = Date.now();
let intervalId = null;

const pollFunction = () => {
  const currentValue = localStorage.getItem("octy_customer_id");
  const currentTimestamp = Date.now();
  const storedTimestamp = localStorage.getItem("p_lst");

  if (Number(storedTimestamp) > lastPollTimestamp) {
    lastPollTimestamp = currentTimestamp;
    const event = new CustomEvent("createupdate_complete", {
      detail: { octy_customer_id: currentValue.replace(/^"(.*)"$/, "$1") },
    });
    window.dispatchEvent(event);

    clearInterval(intervalId);
  } else {
    lastPollTimestamp = currentTimestamp;
  }
};

// Start the interval
intervalId = setInterval(pollFunction, 2000);
