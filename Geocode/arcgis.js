const fetch = require("node-fetch");
const NodeCache = require("node-cache");

const keys = require("../config/keys");

const myCache = new NodeCache();

const AUTH_URL = keys.arcgis.authUrl;
const BASE_URL = keys.arcgis.geocodeEndpoint;

let CLIENT_ID = keys.arcgis.clientId;
let CLIENT_SECRET = keys.arcgis.clientSecret;

class Arcgis {
  constructor() {}
  geocodeQuery(query) {
    return geocodeQuery(query);
  }
  reverseGeocode(dataset, lng, lat) {
    const query = lng + "," + lat;
    return geocodeQuery(dataset, query);
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

const geocodeQuery = async query => {
  // const value = myCache.get("arcgis");
  // if (!value) {
  //   await getToken();
  //   geocodeQuery()
  // }

  const params = new URLSearchParams({
    // token:value.access_token,
    f: "json",
    singleLine: query,
    outFields: "AddNum,StPreDir,StName,StType,City,Postal,Region,Country"
  });
 
  const url = BASE_URL + "?" + params.toString();
  const payload = await fetch(url).then(res => res.json());

  if (!payload) {
    return { errors: [`No response for Address: ${query}`] };
  }

  return payload;
};

module.exports = Arcgis;
