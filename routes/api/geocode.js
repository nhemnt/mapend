const express = require('express');
const router = express.Router();
const nominatim = require('../../Geocode/nominatim');
const mapbox = new require('../../Geocode/mapbox');
const validateGeocodeInput = require("../../validation/geocode");

const Mapbox = new mapbox;
const Nominatim = new nominatim;


router.post('/nominatim', function (req, res, next) {
  const { errors, isValid } = validateGeocodeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Nominatim.geocodeQuery(req.body.address)
    .then((data) => { 
      res.json(data)
    })
    .catch(err => {
      res.json(err);
  })
});


router.post('/mapbox', function (req, res, next) {
  const { errors, isValid } = validateGeocodeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Mapbox.geocodeQuery("mapbox.places", req.body.address)
  .then((data) => { 
    res.json(data)
  })
  .catch(err => {
    res.json(err);
})
});

module.exports = router;