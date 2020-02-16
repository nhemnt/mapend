const fetch = require("node-fetch");
const util = require("../utils");
const keys = require("../config/keys");

const ACCESS_TOKEN = keys.google.key;
const BASE_URL = keys.google.geocodeEndpoint + "geocode/";

class Google {
  constructor() {}
  geocodeQuery(query) {
    return geocodeQuery(query);
  }
  reverseGeocode(lat, lng) {
    if (!util.validateLngLat(lat, lng)) {
      return Promise.resolve({
        errors: [`Enter valid latitude and longitude.`]
      });
    }
    const query = lat + "," + lng;
    return geocodeQuery(query, true);
  }
}

const geocodeQuery = async (query, isReverse = false) => {
  
  const google_maps_options = "json";

  const params = new URLSearchParams({
    [isReverse ? "latlng" : "address"] : query,
    // street: "",
    // city: "",
    // state: "",
    key: ACCESS_TOKEN
  });

  const url = `${BASE_URL}${google_maps_options}?${params.toString()}`;
  console.log(url);

  const payload = await fetch(url).then(res => res.json());

  if (!payload) {
    return Promise.resolve({ errors: [`No response for Address: ${query}`] });
  }

  return payload;
};

module.exports = Google;
