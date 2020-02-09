const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateGeocodeInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.address = !isEmpty(data.address) ? data.address : "";
  data.lat = !isEmpty(data.lat) ? data.lat : "";
  data.lon = !isEmpty(data.lon) ? data.lon : "";
  data.zoom = !isEmpty(data.zoom) ? data.zoom : "";
  data.reverse = !isEmpty(data.reverse) ? data.reverse : false;

  if (data.reverse) {
    if (Validator.isEmpty(data.lat)) {
      errors.lat = "lat field is required";
    }
    if (Validator.isEmpty(data.lon)) {
      errors.lon = "lon field is required";
    }
  } else {
    if (Validator.isEmpty(data.address)) {
      errors.address = "Address field is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
