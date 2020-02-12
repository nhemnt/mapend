const config = require("../configKeys");
module.exports = {
  mongoURI: config.mongoURI,
  secretOrKey: config.secretOrKey,
  mapBoxKey: config.mapBoxKey,
  arcgis: {
    clientId: config.arcgis.clientId,
    clientSecret: config.arcgis.clientSecret,
    authUrl: config.arcgis.authUrl,
    geocodeEndpoint: config.arcgis.geocodeEndpoint,
    reverseGeocodeEndpoint: config.arcgis.reverseGeocodeEndpoint,
    expiry: config.arcgis.expiry
  },
  google: {
    key: config.google.key
  }
};