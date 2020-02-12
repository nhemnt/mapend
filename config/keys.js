let config = {} 
if (process.env.NODE_ENV !== 'production') {
  config = require("../configKeys");
} 
module.exports = {
  mongoURI: process.env.mongoURI || config.mongoURI,
  secretOrKey: process.env.secretOrKey || config.secretOrKey,
  mapBoxKey: process.env.mapBoxKey || config.mapBoxKey,
  arcgis: {
    clientId: process.env["arcgis.clientId"] || config.arcgis["clientId"],
    clientSecret: process.env["arcgis.clientSecret"] || config.arcgis["clientSecret"],
    authUrl: process.env["arcgis.authUrl"] || config.arcgis["authUrl"],
    geocodeEndpoint: process.env["arcgis.geocodeEndpoint"] || config.arcgis["geocodeEndpoint"],
    reverseGeocodeEndpoint: process.env["arcgis.reverseGeocodeEndpoint"] || config.arcgis["reverseGeocodeEndpoint"],
    expiry: process.env["arcgis.expiry"] || config.arcgis["expiry"]
  },
  google: {
    key:  process.env["google.key"] || config.google["key"]
  }
};