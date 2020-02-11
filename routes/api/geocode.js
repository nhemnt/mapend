const express = require("express");
const router = express.Router();
const nominatim = require("../../Geocode/nominatim");
const mapbox = new require("../../Geocode/mapbox");
const arcgis = require("../../Geocode/arcgis");

const validateGeocodeInput = require("../../validation/geocode");

const Mapbox = new mapbox();
const Nominatim = new nominatim();
const Arcgis = new arcgis();

router.post("/nominatim", function(req, res, next) {
  const { errors, isValid } = validateGeocodeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { body } = req;

  const promise = body.reverse
    ? Nominatim.reverseGeocode(body.lat, body.lon, body.zoom)
    : Nominatim.geocodeQuery(body.address);

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/mapbox", function(req, res, next) {
  const { errors, isValid } = validateGeocodeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Mapbox.geocodeQuery("mapbox.places", req.body.address)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/arcgis", function(req, res, next) {
  const { errors, isValid } = validateGeocodeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const { body } = req;

  const promise = body.reverse
    ? Arcgis.reverseGeocode(body.lat, body.lon)
    : Arcgis.geocodeQuery(body.address);

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });

});

module.exports = router;
