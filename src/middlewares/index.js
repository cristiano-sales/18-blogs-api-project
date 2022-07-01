const validateUserData = require('./checkEmailPassword');
const isNotEmpty = require('./requiredFields');
const authenticate = require('./authentication');
const validatePostData = require('./validatePost');
const validatePutData = require('./validatePut');

module.exports = {
  validateUserData,
  isNotEmpty,
  authenticate,
  validatePostData,
  validatePutData,
};
