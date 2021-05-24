const Countries = require("../models/countries.model");
const SchoolGeneralInfo = require("../models/school_general_info.model");
const get_All_countries = async () => {
  try {
    let countries = await Countries.find({});
    return countries;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// get countries details
const list_of_countries = async () => {
  try {
    let countries = await SchoolGeneralInfo.distinct("country");
    if (countries) {
      console.log(countries);
      return countries;
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return error.message;
    }
  }
};

module.exports = {
  get_All_countries,
  list_of_countries,
};
