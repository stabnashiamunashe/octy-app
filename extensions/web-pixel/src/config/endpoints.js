const octyAppHost = "https://pod1.sonity.net/octy-shopify";

module.exports = {
  octyAppHost,
  createCustomerURI: octyAppHost + "/api/customers/createupdate",
  createEventURI: octyAppHost + "/api/hooks/events/create",
  createItemURI: octyAppHost + "/api/hooks/items/create",
  updateItemURI: octyAppHost + "/api/hooks/items/update",
  deleteItemURI: octyAppHost + "/api/hooks/items/delete",
  getContentURI: octyAppHost + "/api/content",
  getRecommendationsURI: octyAppHost + "/api/recommendations",
  pixelURI: octyAppHost + "/api/hooks/events/create",
};
