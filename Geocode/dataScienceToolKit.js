const fetch = require("node-fetch");
const util = require("../utils");
const keys = require("../config/keys");

const BASE_URL = keys.dataScienceToolKit.geocodeEndpoint;
const REVERSE_URL = keys.dataScienceToolKit.reverseGeocodeEndpoint;

class DataScienceToolKit {
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
     address: query, sensor: "false"
  });

  const url = `${isReverse ? REVERSE_URL + query : BASE_URL + "?" + params.toString() }`;
  console.log(url);

  const payload = await fetch(url).then(res => res.json());

  if (!payload) {
    return Promise.resolve({ errors: [`No response for Address: ${query}`] });
  }

  return payload;
};

module.exports = DataScienceToolKit;
