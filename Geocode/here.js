const fetch = require("node-fetch");
const util = require("../utils");
const keys = require("../config/keys");

const ACCESS_TOKEN = keys.here.key;
const BASE_URL = keys.here.geocodeEndpoint;
const REVERSE_URL = keys.here.reverseGeocodeEndpoint;

class Here {
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
    [isReverse ? "pos" : "searchtext"]: query,
    // street: "",
    // city: "",
    // state: "",
    ...(isReverse && { mode: "trackPosition" }),
    apiKey: ACCESS_TOKEN
  });

  const url = `${isReverse ? REVERSE_URL : BASE_URL}${
    isReverse ? "reversegeocode.json" : "geocode.json"
  }?${params.toString()}`;
  console.log(url);

  const payload = await fetch(url).then(res => res.json());

  if (!payload) {
    return Promise.resolve({ errors: [`No response for Address: ${query}`] });
  }

  return payload;
};

module.exports = Here;
