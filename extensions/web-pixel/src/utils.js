function generateOctyCustomerID() {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;  
      return v.toString(16);
    });
  
    return `octy_customer_id-${uuid}`;
  }

function isValidOctyCustomerID(octy_customer_id){
    return /^octy_customer_id-[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(octy_customer_id)
  }


module.exports = {
    generateOctyCustomerID,
    isValidOctyCustomerID
  }