let config = {} 
if (process.env.NODE_ENV !== 'production') {
  config = require("../configKeys");
} 
module.exports = {
  mongoURI: process.env.mongoURI || config.mongoURI,
  secretOrKey: process.env.secretOrKey || config.secretOrKey,
  mapBoxKey: process.env.mapBoxKey || config.mapBoxKey,
  arcgis: {
    clientId: process.env["arcgis.clientId"] || config.arcgisClientId,
    clientSecret: process.env["arcgis.clientSecret"] || config.arcgisClientSecret,
    authUrl: process.env["arcgis.authUrl"] || config.arcgisAuthUrl,
    geocodeEndpoint: process.env["arcgis.geocodeEndpoint"] || config.arcgisGeocodeEndpoint,
    reverseGeocodeEndpoint: process.env["arcgis.reverseGeocodeEndpoint"] || config.arcgisReverseGeocodeEndpoint,
    expiry: process.env["arcgis.expiry"] || config.arcgisExpiry
  },
  google: {
    key: process.env["google.key"] || config.googleKey,
    geocodeEndpoint: process.env["google.geocodeEndpoint"] || config.googleGeocodeEndPoint,
  },
  dataScienceToolKit: {
    geocodeEndpoint: process.env["dataScienceToolKit.geocodeEndpoint"] || config.dataScienceToolKitGeocodeEndpoint,
    reverseGeocodeEndpoint: process.env["dataScienceToolKit.reverseGeocodeEndpoint"] || config.dataScienceToolKitReverseGeocodeEndpoint
  },
  geocod: {
    key: process.env["geocod.key"] || config.geocodApiKey,
    geocodeEndpoint: process.env["geocod.geocodeEndpoint"] || config.geocodUrl
  }
};