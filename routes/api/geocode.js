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
  ? Mapbox.reverseGeocode( body.lat, body.lon)
  : Mapbox.geocodeQuery(body.address);

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



router.post("/", function (req, res, next) {
  const { body } = req;
  const { errors, isValid } = validateGeocodeInput(body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  let promises = [];

  const options = [
    Arcgis,
    Mapbox,
    Nominatim
  ]
    
  options.forEach(option => promises.push(handleGeocodeApi(option, body)));
  

  Promise.all(promises)
        .then(results => {
          res.json(results);
        })
        .catch(err => {
          res.status(400).json(err);
        });



  // const promise = body.reverse
  //   ? Arcgis.reverseGeocode(body.lat, body.lon)
  //   : Arcgis.geocodeQuery(body.address);

  // promise
  //   .then(data => {
  //     res.json(data);
  //   })
  //   .catch(err => {
  //     res.json(err);
  //   });

});

const handleGeocodeApi = (option, body) => {
  return body.reverse
  ? option.reverseGeocode(body.lat, body.lon)
  : option.geocodeQuery(body.address);
}
module.exports = router;
