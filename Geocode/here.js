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
  
  const view = payload.Response.View[0];
    if (!view) {
      return Promise.resolve({ errors: [`No response for Address: ${query}`] });;  
    }
  const results = view.Result.map(formatResult);

  return results;
};

const formatResult = (result) => {
  try {
    

    let location = result.Location || {};
    let address = location.Address || {};
    let i;
  
    let extractedObj = {
      formattedAddress: address.Label || null,
      latitude: location.DisplayPosition.Latitude,
      longitude: location.DisplayPosition.Longitude,
      country: null,
      countryCode: address.Country || null,
      state: address.State || null,
      county: address.County || null,
      city: address.City || null,
      zipcode: address.PostalCode || null,
      district: address.District || null,
      streetName: address.Street || null,
      streetNumber: address.HouseNumber || null,
      building: address.Building || null,
      extra: {
        herePlaceId: location.LocationId || null,
        confidence: result.Relevance || 0
      },
      administrativeLevels: {}
    };
  
    for (i = 0; i < address.AdditionalData.length; i++) {
      let additionalData = address.AdditionalData[i];
      switch (additionalData.key) {
        //Country 2-digit code
        case 'Country2':
          extractedObj.countryCode = additionalData.value;
          break;
        //Country name
        case 'CountryName':
          extractedObj.country = additionalData.value;
          break;
        //State name
        case 'StateName':
          extractedObj.administrativeLevels.level1long = additionalData.value;
          extractedObj.state = additionalData.value;
          break;
        //County name
        case 'CountyName':
          extractedObj.administrativeLevels.level2long = additionalData.value;
          extractedObj.county = additionalData.value;
      }
    }
  
    return extractedObj;
  } catch (err) {
    console.log(err);
    return Promise.resolve({ errors: [`No response for Address` , err] });
  }
  
  
}

module.exports = Here;
