const { check } = require("express-validator");

exports.student_register_validations = [
  check("first_name").not().isEmpty().withMessage("FirstName is required."),
  check("last_name").not().isEmpty().withMessage("LastName is required."),
  check("phone_number")
    .not()
    .isEmpty()
    .withMessage("Phone number is required.")
    .isNumeric()
    .withMessage("Phone number should be in number."),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email."),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required.")
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.confirmpassword) {
        // trow error if passwords do not match
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),
];

exports.student_login_validations = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Please enter your email.")
    .isEmail()
    .withMessage("Please enter a valid email."),
  check("password").not().isEmpty().withMessage("Pleasse enter your password."),
];

exports.agent_register_validations = [
  check("company_name").not().isEmpty().withMessage("Required."),
  check("facebook").not().isEmpty().withMessage("Required."),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email."),
  check("legal_first_name").not().isEmpty().withMessage("Required."),
  check("legal_last_name").not().isEmpty().withMessage("Required."),
  check("streat_address").not().isEmpty().withMessage("Required."),
  check("city").not().isEmpty().withMessage("Required."),
  check("country").not().isEmpty().withMessage("Required."),
  check("state").not().isEmpty().withMessage("Required."),
  check("principle_country").not().isEmpty().withMessage("Required."),
  check("postal_code").not().isEmpty().withMessage("Required."),
  check("streat_address").not().isEmpty().withMessage("Required."),
  check("whatsapp_id").not().isEmpty().withMessage("Required."),
  check("phone")
    .not()
    .isEmpty()
    .withMessage("Phone number is required.")
    .isNumeric()
    .withMessage("Phone number should be in number."),
];
