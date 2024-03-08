const endpoints = require('./config/endpoints')
const utils = require('./utils')

/**
 * @param {any} octyCustomerID
 * @param {any} fingerprint_id
 * @param {any} shopify_customer_id
 * @param {string} shop
 */

async function createUpdateProfile(octyCustomerID, fingerprint_id , shopify_customer_id, shop) {
    try {
        let octyCustomerId 
        let generatedNewId = false 
    
        let profileData = {
          
        } 
    
        if (octyCustomerID == null) {

          octyCustomerId = utils.generateOctyCustomerID()
          generatedNewId = true

          profileData.fingerprint_id = fingerprint_id;

        } else {
          octyCustomerId = octyCustomerID;
        }
    
        if (shopify_customer_id == null) {
 
          shopify_customer_id = ''
        } else {

          profileData.shopify_customer_id = shopify_customer_id;
          delete profileData.fingerprint_id

        }
  
      const response = await fetch(`${endpoints.createCustomerURI}?shop=${shop}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          octy_customer_id: octyCustomerId,
          shopify_customer_id: shopify_customer_id,
          has_charged: false,
          profile_data: profileData,
          platform_info: {},
          generated_new_id: generatedNewId,
        }),
      });
  
      if (response.status === 200 || response.status === 201) {
        const customerID = await response.text();
        return customerID;
      } else {
        console.log(
          'Failed to create new Octy profile! Unable to track events or provide personalised experience during this session 1'
        );
        throw new Error('Server Error');
      }

    } catch (error) {
      throw new Error('Server Error');
    }
}

let socket;

async function establishWebSocketConnection(browser) {
  const is_connection_available = await browser.localStorage.getItem("octy_ica")
  const octy_customer_id = await browser.localStorage.getItem("octy_customer_id")

  if (is_connection_available) {

    socket = new WebSocket(process.env.OCTY_WEBSOCKET_URL + octy_customer_id);
  } else {
    
    socket = new WebSocket(process.env.OCTY_WEBSOCKET_URL + octy_customer_id);

    socket.addEventListener('open', (event) => {
      console.log("This is from Web Pixels")
      console.log('WebSocket connection opened:', event);

    });

    socket.addEventListener('message', (event) => {
      console.log('Message from server:', event.data);

      const message = JSON.parse(event.data);

      if (message.type === 'coupon') {
        console.log('Received coupon code:', message.couponCode);

        const event = new CustomEvent('octy:gift_coupon', { detail: { octy_coupon_code: message.couponCode } });
        window.dispatchEvent(event);

      }
    });

    socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

    socket.addEventListener('close', (event) => {
      const setLocalStorageItem = async () => {
        await browser.localStorage.setItem("octy_ica", false);
      };
    
      setLocalStorageItem();
    });
  }
};


module.exports = {
  createUpdateProfile,
  establishWebSocketConnection
}
