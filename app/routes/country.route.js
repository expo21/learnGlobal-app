const { get_All_countries } = require("../controllers/countries.controller");
const { get_streams } = require("../controllers/stream.controller");

module.exports = (app) => {
  //get countries
  app.get(`/v1/countries`, (req, res) => {
    get_All_countries().then((result) => {
      if (result) {
        res.send({ status: true, data: result });
      }
    });
  });

  app.get(`/v1/streams`, (req, res) => {
    get_streams().then((result) => {
      if (result) {
        res.send({ status: true, data: result });
      }
    });
  });
};
