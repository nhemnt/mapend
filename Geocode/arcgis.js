const fetch = require("node-fetch");
const NodeCache = require("node-cache");
const util = require("../utils");
const keys = require("../config/keys");

const myCache = new NodeCache();

const AUTH_URL = keys.arcgis.authUrl;
const BASE_URL = keys.arcgis.geocodeEndpoint;
const REVERSE_URL = keys.arcgis.reverseGeocodeEndpoint;

let CLIENT_ID = keys.arcgis.clientId;
let CLIENT_SECRET = keys.arcgis.clientSecret;

class Arcgis {
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
    const query = lng + "," + lat;
    return geocodeQuery(query);
  }
}

const getToken = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("expiration", keys.arcgis.expiry);

  await fetch(AUTH_URL, { method: "POST", body: params })
    .then(res => res.json())
    .then(data => {
      if (data && data.access_token) {
        myCache.set(
          "arcgis",
          { access_token: data.access_token },
          data.expires_in
        );
      }
    });
  return;
};



const geocodeQuery = async (query, isReverse = false) => {
  //TODO: Handle with promise
  // const value = myCache.get("arcgis");
  // if (!value) {
  //   await getToken();
  //   geocodeQuery()
  // }

  const params = new URLSearchParams({
    // token:value.access_token,
    f: "json",
    ...(isReverse
      ? { location: query }
      : {
          singleLine: query,
          outFields: "AddNum,StPreDir,StName,StType,City,Postal,Region,Country"
        })
  });

  const url = `${isReverse ? REVERSE_URL : BASE_URL}?${params.toString()}`;

  const payload = await fetch(url).then(res => res.json());

  if (!payload) {
    return { errors: [`No response for Address: ${query}`] };
  }

  return payload;
};

module.exports = Arcgis;
