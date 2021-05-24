const {
  get_school_info_by_id,
  discover_all_schools,
  get_random_schools,
} = require("../controllers/school_general_info.controller");

module.exports = (app) => {
  //get school info
  app.get("/v1/school_info/:id", (req, res) => {
    let { id } = req.params;
    get_school_info_by_id(id)
      .then((result) => {
        if (result) {
          res.send({ status: true, message: "", data: result });
        } else {
          res.send({
            status: false,
            message: "Something went wrong. Please try later.",
          });
        }
      })
      .catch((err) => {
        res.send({ status: false, message: error.message });
      });
  });

  //discoverAllSchools
  app.get("/v1/discoverSchool", (req, res) => {
    discover_all_schools()
      .then((result) => {
        res.send({ status: true, data: result });
      })
      .catch((error) => {
        res.send({ status: false, message: error.message });
      });
  });

  //get random list of collage/uni.
  app.get("/v1/top_unversities", (req, res) => {
    get_random_schools()
      .then((result) => {
        if (result) {
          res.send({
            status: true,
            message: "Top Universities List.",
            data: result,
          });
        } else {
          res.send({
            status: false,
            message: "Something went wrong. Please try later.",
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.send({
            status: false,
            message: "Something went wrong. Please try later.",
          });
        }
      });
  });
};
