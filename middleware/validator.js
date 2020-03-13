const expressValidator = require("express-validator");

const validationForCreateUser = () => {
  const { check } = expressValidator;
  return [check("email").isEmail(), check("password").isLength({ min: 6 })];
};
const validationForCreateMessage = () => {
  const { check } = expressValidator;
  return [!check("messageText").isEmpty()];
};
const validate = (req, res, next) => {
  const { validationResult } = expressValidator;

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};
module.exports = {
  validationForCreateUser,
  validationForCreateMessage,
  validate
};
