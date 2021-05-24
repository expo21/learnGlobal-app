const {
  get_All_countries,
  list_of_countries,
} = require("../controllers/countries.controller");
const { get_streams } = require("../controllers/stream.controller");

module.exports = (app) => {
  //get countries
  app.get(`/v1/countries`, (req, res) => {
    get_All_countries()
      .then((result) => {
        if (result) {
          res.send({ status: true, message: "country list", data: result });
        } else {
          res.send({
            status: false,
            message: "something went wrong.",
            data: {},
          });
        }
      })
      .catch((error) => {
        if (error) {
          res.send({
            status: false,
            message: "something went wrong.",
            data: {},
          });
        }
      });
  });

  app.get(`/v1/streams`, (req, res) => {
    get_streams().then((result) => {
      if (result) {
        console.log(result);
        res.send({ status: true, data: result });
      } else {
        res.send({
          status: false,
          message: "something went wrong.",
          data: {},
        });
      }
    });
  });

  ///list of countries
  app.get(`/v1/countries_list`, (req, res) => {
    list_of_countries()
      .then((result) => {
        if (result) {
          res.send({
            status: true,
            message: "list of countries.",
            data: result,
          });
        } else {
          res.send({
            status: false,
            message: "Something went wrong.",
            data: {},
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, message: "Something went wrong.", data: {} });
      });
  });
};
