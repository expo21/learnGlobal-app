module.exports = (app) => {
  const { check, validationResult } = require("express-validator");
  const liveQuery = require("../controllers/live_query.controller");
  const ProgramCourses = require("../models/programCourses.model.js");

  //create live query
  app.post(
    "/v1/liveQuery",
    [
      check("first_name").not().isEmpty().withMessage("Required."),
      check("last_name").not().isEmpty().withMessage("Required."),
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please enter a valid email."),
      check("mobile")
        .not()
        .isEmpty()
        .withMessage("Phone number is required.")
        .isNumeric()
        .withMessage("Phone number should be in number."),
      check("term")
        .not()
        .isEmpty()
        .withMessage("You must accept the terms and conditions."),
    ],
    (req, res) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({ status: false, error: errors.mapped() });
      } else {
        let dataObj = req.body;
        liveQuery
          .create_live_query(dataObj)
          .then((result) => {
            if (result) {
              //send info to the student on provided email.
              res.send({
                status: true,
                message: "Information sent to your email. Please check",
                data: {},
              });
            }
          })
          .catch((error) => {
            res.send({ status: false, message: error.message, data: {} });
          });
      }
    }
  );

  //get distinct stream_id
  app.get("/streams", (req, res) => {
    ProgramCourses.distinct("stream")
      .then((result) => {
        res.send({ status: true, message: "Streams.", data: result });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
