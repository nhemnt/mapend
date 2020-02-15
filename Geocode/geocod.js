const fetch = require("node-fetch");
const util = require("../utils");
const keys = require("../config/keys");

const ACCESS_TOKEN = keys.geocod.key;
const BASE_URL = keys.geocod.geocodeEndpoint + "geocode";
const REVERSE_URL = keys.geocod.geocodeEndpoint + "reverse";


// curl "https://api.geocod.io/v1.4/geocode?q=1109+N+Highland+St%2c+Arlington+VA&api_key=YOUR_API_KEY"

// curl "https://api.geocod.io/v1.4/geocode?street=1109+N+Highland+St&city=Arlington&state=VA&api_key=YOUR_API_KEY"

class Geocod {
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
  const params = new URLSearchParams({
    q: query,
    // street: "",
    // city: "",
    // state: "",
    api_key: ACCESS_TOKEN
  });

  const url = `${isReverse ? REVERSE_URL : BASE_URL}?${params.toString()}`;
  console.log(url);

  const payload = await fetch(url).then(res => res.json());

  if (!payload) {
    return Promise.resolve({ errors: [`No response for Address: ${query}`] });
  }

  return payload;
};

module.exports = Geocod;
