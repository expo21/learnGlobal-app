const {
  get_course_by_id,
  check_eligibility,
  check_programs,
  get_random_courses,
} = require("../controllers/programCourses.controller");

module.exports = (app) => {
  //get course by id
  app.get("/v1/course/:id", (req, res) => {
    get_course_by_id(req.params.id)
      .then((result) => {
        if (result) {
          res.send({ status: true, data: result, message: "Result found." });
        } else {
          res.send({ status: false, message: "Something went wrong." });
        }
      })
      .catch((error) => {
        res.send({ status: false, error: error.message });
      });
  });

  //check eligibility
  app.get("/v1/checkEligibility", (req, res) => {
    console.log("sddfs");
    check_eligibility(req.query)
      .then((result) => {
        console.log(result);
        if (result.schoolLength > 0) {
          res.send({
            status: true,
            message: "Eligible program courses",
            result,
          });
        } else {
          res.send({ status: false, message: result.message, result: [] });
        }
      })
      .catch((err) =>
        res.send({ status: false, message: err.message, result: [] })
      );
  });

  //check eligible program
  app.get("/v1/checkProgram", (req, res) => {
    console.log(req.query);
    check_programs(req.query)
      .then((result) => {
        res.send({ status: true, result });
      })
      .catch((error) => {
        res.send({ status: false, error });
      });
  });

  // get random courses list
  app.get("/v1/trending_courses", (req, res) => {
    get_random_courses()
      .then((result) => {
        if (result) {
          res.send({
            status: true,
            message: "Trending Courses list.",
            data: result,
          });
        } else {
          res.send({
            status: false,
            message: "something went wrong.",
            data: [],
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.send({
            status: false,
            message: "something went wrong.",
            data: [],
          });
        }
      });
  });
};
