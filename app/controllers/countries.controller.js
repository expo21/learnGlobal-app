const Countries = require("../models/countries.model");

const get_All_countries = async () => {
  try {
    let countries = await Countries.find({});
    console.log({ countries });
    return countries;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  get_All_countries,
};
