const CountryPage = require("../models/country_page.model");
//get all countries
const getAllCountries = async () => {
  try {
    let countries = await CountryPage.find();
    return countries;
  } catch (error) {
    throw error;
  }
};
//get country by id
const getCountryById = async (id) => {
  try {
    let country = await CountryPage.findOne({ id });
    if (!country) {
      throw new Error("Page not Found");
    } else {
      return country;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
};
