const SchoolGeneralInfo = require("../models/school_general_info.model");

// get school info by id
const get_school_info_by_id = async (id) => {
  try {
    let school_info = await SchoolGeneralInfo.aggregate([
      { $match: { id } },
      {
        $lookup: {
          from: "SchoolAbout",
          localField: "id",
          foreignField: "school_genral_id",
          as: "school_about_info",
        },
      },
      {
        $lookup: {
          from: "SchoolLogo",
          localField: "school_about_info.id",
          foreignField: "school_about_id",
          as: "school_logo",
        },
      },
      {
        $lookup: {
          from: "SchoolFeatures",
          localField: "id",
          foreignField: "school_id",
          as: "school_features",
        },
      },
      {
        $lookup: {
          from: "ProgramsCourse",
          localField: "id",
          foreignField: "school_id",
          as: "programs_course",
        },
      },

      { $unwind: "$school_about_info" },
      { $unwind: "$school_logo" },
      { $unwind: "$school_features" },
      {
        $project: {
          school_name: 1,
          country: 1,
          country_logo: 1,
          school_location: 1,
          "school_about_info.about": 1,
          "school_about_info.int_student": 1,
          "school_about_info.total_student": 1,
          "school_logo.logo": 1,
          "school_logo.founded": 1,
          "school_features.accomodation": 1,
          "school_features.work_permit": 1,
          "school_features.program_cooporation": 1,
          "school_features.work_while_study": 1,
          "school_features.condition_offer_letter": 1,
          "school_features.library": 1,
          "programs_course.id": 1,
          "programs_course.course": 1,
        },
      },
    ]);
    return school_info[0];
  } catch (error) {
    console.log(error);
  }
};

const discover_all_schools = async () => {
  try {
    let schools = await SchoolGeneralInfo.aggregate([
      { $match: {} },
      {
        $lookup: {
          from: "SchoolAbout",
          localField: "id",
          foreignField: "school_genral_id",
          as: "school_about_info",
        },
      },
      {
        $lookup: {
          from: "SchoolLogo",
          localField: "school_about_info.id",
          foreignField: "school_about_id",
          as: "school_logo",
        },
      },
      { $unwind: "$school_about_info" },
      { $unwind: "$school_logo" },
      {
        $project: {
          id: 1,
          school_name: 1,
          country: 1,
          country_logo: 1,
          "school_about_info.int_student": 1,
          "school_about_info.total_student": 1,
          "school_logo.logo": 1,
          "school_logo.founded": 1,
        },
      },
    ]);
    return schools;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get_school_info_by_id,
  discover_all_schools,
};
