const {
  student_register_validations,
  student_login_validations,
} = require("../utils/validations");

module.exports = (app) => {
  const { check, validationResult } = require("express-validator");
  const {
    register_student,
    getStudentByEmail,
    login_student,
  } = require("../controllers/student.controller");
  // const { validate } = require("../utils/validations/index");

  //register student
  app.post("/signup", student_register_validations, (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    } else {
      getStudentByEmail(req.body.email)
        .then((value) => {
          if (value) {
            res.send({ status: false, message: "User already exists." });
          } else {
            register_student(req.body)
              .then((result) => {
                if (result) {
                  res.send({
                    status: true,
                    message: "user registered.",
                    data: {},
                  });
                } else {
                  res.send({
                    stauts: false,
                    message: "Something went wrong.",
                  });
                }
              })
              .catch((error) => {
                console.log(error);
                res.send({ status: false, message: error.message });
              });
          }
        })
        .catch((error) => {
          console.log(error);
          res.send({ status: false, message: error.message });
        });
    }
  });

  //student login
  app.post("/login", student_login_validations, (req, res) => {
    var errors = validationResult(req);
    if (errors.length > 0) {
      return res.status(422).json({ errors: errors.mapped() });
    } else {
      login_student(req.body)
        .then((result) => {
          if (result) {
            res.send({
              status: true,
              message: "Student loged in.",
              data: result,
            });
          } else {
            res.send({ status: false, message: "Something went wrong." });
          }
        })
        .catch((error) => {
          res.send({ status: false, message: error.message });
        });
    }
  });
};
