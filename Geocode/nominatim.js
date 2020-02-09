const fetch = require("node-fetch");

const BASE_URL = "https://nominatim.openstreetmap.org/search?";

class Nominatim {
  constructor() {}
  geocodeQuery(query, limit = "1") {
    const params = new URLSearchParams({
      query,
      limit,
      format: "json"
    });
    return geocodeQuery(params);
  }
  reverseGeocode(dataset, lng, lat) {
    const query = lng + "," + lat;
    return geocodeQuery(dataset, query);
  }
}
const geocodeQuery = async params => {
  const url = BASE_URL + params.toString();
  const payload = await fetch(url).then(res => res.json());
  if (!payload || !payload.length) {
    return { errors: [`No response for Address: ${params.get("query")}`] };
  }

  return payload;
};

module.exports = Nominatim;
