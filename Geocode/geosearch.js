const fetch =  require("node-fetch");

// interface Location {
//   place_id: number;
//   licence: string;
//   osm_type: string;
//   osm_id: number;
//   boundingbox: string[];
//   lat: string;
//   lon: string;
//   display_name: string;
//   class: string;
//   type: string;
//   importance: number;
//   icon: string;
// };

const geosearch = async (q, limit = "1") => {
  const params = new URLSearchParams({
    q,
    limit,
    format: "json"

  });

  const ENDPOINT = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
  const payload = await fetch(ENDPOINT).then(res => res.json());

  if (!payload || !payload.length) {
    throw new Error(`No response for Address: ${q}`);
  }

  return payload;
};


module.exports = geosearch;