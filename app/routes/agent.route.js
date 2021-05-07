const { agent_register_validations } = require("../utils/validations/index.js");

module.exports = (app) => {
  const { check, validationResult } = require("express-validator");
  const { transporter } = require("../utils/helper/nodeMail.js");
  const {
    agent_by_email,
    register_agent,
  } = require("../controllers/agent.controller");

  //register agent
  app.post(
    "/agent/signup",
    // agent_register_validations,
    (req, res) => {
      var errors = validationResult(req);
      // var errors = [];
      if (!errors.isEmpty()) {
        return res.send({ status: false, error: errors.mapped() });
      } else {
        let dataObj = req.body;
        agent_by_email(dataObj.email)
          .then((val) => {
            if (val) {
              res.send({ status: false, message: "Agent already exists." });
            } else {
              register_agent(dataObj)
                .then((result) => {
                  if (result) {
                    //email password to the agent
                    res.send({
                      status: true,
                      message: "Agent registered.",
                      data: dataObj,
                    });
                  } else {
                    res.send({
                      stauts: false,
                      message: "Something went wrong.",
                    });
                  }
                })
                .catch((error) => {
                  res.send({ status: false, error: error.message });
                });
            }
          })
          .catch((error) => {
            res.send({ status: false, error: error.message });
          });
      }
    }
  );

  //login agent
  app.post(
    "/agent/login",
    [
      check("username")
        .not()
        .isEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please enter a valid email."),
      check("password")
        .not()
        .isEmpty()
        .withMessage("Please enter your password."),
    ],
    (req, res) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send({ status: false, error: errors.mapped() });
      } else {
        agent_by_email(req.body.username)
          .then((result) => {
            if (result) {
              //check for username and password
            } else {
              throw new Error("No user with this email.");
            }
          })
          .catch((error) => {
            res.send({ status: false, message: error.message });
          });
      }
    }
  );
};
