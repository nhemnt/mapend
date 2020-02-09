const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateGeocodeInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.address = !isEmpty(data.address) ? data.address : "";

// Address checks
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};