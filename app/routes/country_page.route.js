const {
  getAllCountries,
  getCountryById,
  get_country_details,
} = require("../controllers/country_page.controller");

module.exports = (app) => {
  //get all countries list
  app.get("/v1/country", (req, res) => {
    getAllCountries()
      .then((result) => {
        if (result) {
          res.send({ status: true, message: "All countries.", data: result });
        } else {
          res.send({
            status: false,
            message: "something went wrong.",
            data: [],
          });
        }
      })
      .catch((error) => {
        res.send({ status: false, message: error.message, data: [] });
      });
  });

  //get single country
  app.get("/v1/country/:id", (req, res) => {
    getCountryById(req.params.id)
      .then((result) => {
        if (result) {
          res.send({
            status: true,
            message: `country by id ${req.params.id}`,
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
        res.send({ status: false, message: error.message, data: [] });
      });
  });

  //get country details
  app.get("/v1/countryDetails", (req, res) => {
    get_country_details()
      .then((result) => {
        if (result) {
          res.send({
            status: true,
            message: "Country Details. ",
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
