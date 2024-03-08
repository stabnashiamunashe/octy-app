import { register } from "@shopify/web-pixels-extension";
const octy_functions = require("./octy_functions");
const endpoints = require("./config/endpoints");
const utils = require("./utils");

register(async ({ analytics, browser, settings, init }) => {
  const customer = init.data.customer;
  const cart = init.data.cart;

  let has_visited =
    (await browser.cookie.get("has_visited")) === "true" ? true : false;

  async function getClientData() {
    const response = await fetch(
      "https://pod1.sonity.net/octy-client-info/info"
    );
    const data = await response.json();
    return data;
  }

  let client_data = await getClientData();

  if (!has_visited) {
    const fingerprint_id = client_data.full_hash;

    const dt = new Date();
    dt.setTime(dt.getTime() + 1 * 24 * 60 * 60 * 1000);
    const expire = "expires=" + dt.toUTCString();
    await browser.cookie.set(
      `fingerprint_id=${fingerprint_id};` + expire + ";path=/"
    );

    let shopify_customer_id = null;

    if (customer !== null) {
      shopify_customer_id = customer.id;
    }

    let clearLS = true;

    try {
      let customer_id;

      const old_octy_customer_id = await browser.localStorage.getItem(
        "octy_customer_id"
      );

      if (old_octy_customer_id !== null) {
        clearLS = false;
        customer_id = old_octy_customer_id.replace(/^"(.*)"$/, "$1");

        // check if the customer id is valid and contains octy-customer-id prefix
        if (!utils.isValidOctyCustomerID(customer_id)) {
          customer_id = null;
        }
      }

      const new_octy_customer_id = await octy_functions.createUpdateProfile(
        customer_id,
        fingerprint_id,
        shopify_customer_id,
        settings.accountID
      );
      await browser.localStorage.setItem(
        "octy_customer_id",
        new_octy_customer_id.replace(/^"(.*)"$/, "$1")
      );

      const timestamp = Date.now();
      await browser.localStorage.setItem("p_lst", timestamp);
    } catch (error) {
      console.error(error);
      if (clearLS) {
        await browser.localStorage.removeItem("octy_customer_id");
      }
    }

    // Set has visited to true so that this code does not run again within the specified time. set it as a cookie that has a 1 day expiry
    const date = new Date();
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    await browser.cookie.set(`has_visited=true;` + expires + ";path=/");
  }

  analytics.subscribe("checkout_started", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    console.log(eventData);

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("cart_viewed", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("checkout_address_info_submitted", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    console.log(eventData);

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("checkout_completed", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("checkout_contact_info_submitted", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    console.log(eventData);

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("checkout_shipping_info_submitted", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("collection_viewed", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("page_viewed", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("payment_info_submitted", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("product_added_to_cart", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("product_removed_from_cart", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("product_viewed", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("search_submitted", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  // Custom events

  analytics.subscribe("page_scroll", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      customData: event.customData,
      context: event.context,
      octy_customer_id: octy_customer_id,
      client_data,
      shopify_customer_info: customer,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      headers: {
        "x-shopify-shop-domain": settings.accountID,
      },
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("product_hover", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      customData: event.customData,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("product_quantity_changed", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      customData: event.customData,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      headers: {
        "x-shopify-shop-domain": settings.accountID,
      },
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  // DOM Events

  analytics.subscribe("clicked", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    console.log(eventData);

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("form_submitted", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    console.log(eventData);

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("input_blurred", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    console.log(eventData);

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("input_changed", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    console.log(eventData);

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });

  analytics.subscribe("input_focused", async (event) => {
    const raw_octy_customer_id = await browser.localStorage.getItem(
      "octy_customer_id"
    );

    let octy_customer_id = null;
    if (raw_octy_customer_id != null) {
      octy_customer_id = raw_octy_customer_id.replace(/^"(.*)"$/, "$1");
    }

    const fingerprint_id = await browser.cookie.get("fingerprint_id");

    const eventData = {
      id: event.id,
      name: event.name,
      fingerprint_id: fingerprint_id,
      timestamp: event.timestamp,
      clientId: event.clientId,
      data: event.data,
      context: event.context,
      octy_customer_id: octy_customer_id,
      shopify_customer_info: customer,
      client_data,
      cart: cart,
    };

    console.log(eventData);

    fetch(`${endpoints.pixelURI}?shop=${settings.accountID}`, {
      method: "POST",
      body: JSON.stringify(eventData),
      keepalive: true,
    });
  });
});
