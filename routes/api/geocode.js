const express = require("express");
const router = express.Router();
const nominatim = require("../../Geocode/nominatim");
const mapbox = new require("../../Geocode/mapbox");
const arcgis = require("../../Geocode/arcgis")

const validateGeocodeInput = require("../../validation/geocode");

const Mapbox = new mapbox();
const Nominatim = new nominatim();
const Arcgis = new arcgis();

router.post("/nominatim", function(req, res, next) {
  const { errors, isValid } = validateGeocodeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (req.body.reverse) {
    const { lat, lon, zoom } = req.body;

    Nominatim.reverseGeocode( lat, lon, zoom)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  } else {
    Nominatim.geocodeQuery(req.body.address)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  }
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
  Arcgis.geocodeQuery(req.body.address)
    .then(data => {
      console.log('************')
      console.log(data)
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
