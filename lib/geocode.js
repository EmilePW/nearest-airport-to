const requestP = require("./request-p");
const removeAccents = require("remove-accents");
const googleMapsGeocodeURL =
  "https://maps.googleapis.com/maps/api/geocode/json?";

async function getLatLng(placeStr) {
  placeStr = removeAccents(placeStr);
  var geocodingRequest = await requestP(
    `${googleMapsGeocodeURL}address=${placeStr}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  var geocodingResponse = await geocodingRequest;
  var geocodingResults = JSON.parse(geocodingResponse).results;
  var { lat, lng } = geocodingResults[0].geometry.location;

  return { lat, lng };
}

module.exports = {
  getLatLng
};
