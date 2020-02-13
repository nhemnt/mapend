const keys = require("../config/keys");
const fetch = require("node-fetch");
const util = require("../utils");

const BASE_URL = "https://api.mapbox.com/geocoding/v5/";

let ACCESS_TOKEN = keys.mapBoxKey;

class Mapbox {
  constructor() {}
  setAccessToken(accessToken) {
    ACCESS_TOKEN = accessToken;
  }
  geocodeQuery(query, dataset = "mapbox.places") {
    return geocodeQuery(dataset, query);
  }
  reverseGeocode(lng, lat, dataset = "mapbox.places") {
    if (!util.validateLngLat(lat, lng)) {
     return Promise.resolve({
        errors: [`Enter valid latitude and longitude.`]
      });
    }
    const query = lng + "," + lat;
    return geocodeQuery(dataset, query);
  }
}
const geocodeQuery = async (dataset, query) => {
  const url =
    BASE_URL + dataset + "/" + query + ".json?access_token=" + ACCESS_TOKEN;
  const payload = await fetch(url).then(res => res.json());

  if (!payload) {
    return { errors: [`No response for Address: ${query}`] };
  }
  return payload;
};

module.exports = Mapbox;
