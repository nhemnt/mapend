const express = require("express");
const router = express.Router();
const nominatim = require("../../Geocode/nominatim");
const mapbox = require("../../Geocode/mapbox");
const arcgis = require("../../Geocode/arcgis");

const validateGeocodeInput = require("../../validation/geocode");

const Mapbox = new mapbox();
const Nominatim = new nominatim();
const Arcgis = new arcgis();

router.post("/nominatim", function (req, res, next) {
  const { body } = req;
  const { errors, isValid } = validateGeocodeInput(body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

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

router.post("/mapbox", function (req, res, next) {
  const { body } = req;
  const { errors, isValid } = validateGeocodeInput(body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const promise = body.reverse
  ? Mapbox.reverseGeocode("mapbox.places", body.lat, body.lon)
  : Mapbox.geocodeQuery("mapbox.places", body.address);

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });

});

router.post("/arcgis", function (req, res, next) {
  const { body } = req;
  const { errors, isValid } = validateGeocodeInput(body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

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
