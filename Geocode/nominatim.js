const fetch = require("node-fetch");

const BASE_URL = "https://nominatim.openstreetmap.org/";

class Nominatim {
  constructor() {}
  geocodeQuery(q, limit = "1") {
    const params = new URLSearchParams({
      q,
      limit,
      format: "json"
    });

    const type = "search";
    
    return geocodeQuery(params, type);
  }
  reverseGeocode(lat, lon, zoom ) {

    const params = new URLSearchParams({
      lat,
      lon,
      zoom: zoom ? zoom : 18,
      format: "json"
    });

    const type = "reverse";
    
    return geocodeQuery(params, type);
  }
}
const geocodeQuery = async (params, type) => {
  const url = BASE_URL + type + "?" + params.toString();
  console.log(url);
  const payload = await fetch(url).then(res => res.json());
  if (!payload) {
    return { errors: [`No response for Address: ${params.get("q")}`] };
  }

  return payload;
};

module.exports = Nominatim;
