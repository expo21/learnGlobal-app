const CountryPage = require("../models/country_page.model");
const SchoolGeneralInfo = require("../models/school_general_info.model");

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
    let country = await CountryPage.aggregate([
      {
        $match: {
          id,
        },
      },
      {
        $lookup: {
          from: "SchoolGeneralInfo",
          localField: "country_name",
          foreignField: "country",
          as: "school_info",
        },
      },
      {
        $lookup: {
          from: "SchoolLogo",
          localField: "school_info.id",
          foreignField: "school_about_id",
          as: "school_logo",
        },
      },
      {
        $project: {
          country_name: 1,
          country_image: 1,
          content: 1,
          country_description: 1,
          "school_info.id": 1,
          "school_info.school_name": 1,
          "school_logo.id": 1,
          "school_logo.logo": 1,
        },
      },
    ]);
    if (!country) {
      throw new Error("Page not Found");
    } else {
      return country;
    }
  } catch (error) {
    throw error;
  }
};

//country
const get_country_details = async () => {
  try {
    let response = await SchoolGeneralInfo.aggregate([
      {
        $lookup: {
          from: "SchoolAbout",
          localField: "id",
          foreignField: "school_genral_id",
          as: "SchoolAbout",
        },
      },
      { $unwind: "$SchoolAbout" },
      {
        $group: {
          _id: "$country",

          sum: { $sum: "$SchoolAbout.total_student" },
        },
      },
    ]);
    let res = await Promise.all(
      response.map(async (item) => {
        let { _id } = item;
        let details = await CountryPage.findOne(
          {
            country_name: _id,
          },
          { id: 1, country_image: 1 }
        );
        console.log(details);
        return {
          _id: item._id,
          sum: item.sum,
          country_details: details,
        };
      })
    );

    if (res) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    if (error) {
      return false;
    }
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  get_country_details,
};
