const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateJournalInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.stock = !isEmpty(data.stock) ? data.stock : "";
 // data.password = !isEmpty(data.password) ? data.password : "";

  // Stock checks
  if (Validator.isEmpty(data.stock)) {
    errors.stock = "stock field is required";
  } /*else if (!Validator.isstock(data.stock)) {
    errors.stock = "stock is invalid";
  }*/
/*   // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
