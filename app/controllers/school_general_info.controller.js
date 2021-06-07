const SchoolGeneralInfo = require("../models/school_general_info.model");
const SchoolAbout = require("../models/school_about.model");

// get school info by id
const get_school_info_by_id = async (id) => {
  console.log(id);
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
    console.log(school_info);
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
    if (schools.length > 0) {
      // const json2csvParser = new Json2csvParser({ header: true });
      // const csvData = json2csvParser.parse(schools);
      // fs.writeFile("mongodb_fs.csv", csvData, function (error) {
      //   if (error) throw error;
      //   console.log("Write to bezkoder_mongodb_fs.csv successfully!");
      // });

      return schools;
    } else false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//get random schools
const get_random_schools = async () => {
  try {
    let random_schools = await SchoolAbout.aggregate([
      { $match: { total_student: { $gte: 10000 } } },

      { $sample: { size: 10 } },
      {
        $lookup: {
          from: "SchoolGeneralInfo",
          localField: "school_genral_id",
          foreignField: "id",
          as: "school_general_info",
        },
      },
      {
        $lookup: {
          from: "SchoolLogo",
          localField: "school_general_info.id",
          foreignField: "school_about_id",
          as: "school_logo",
        },
      },
      { $unwind: "$school_general_info" },
      { $unwind: "$school_logo" },
      {
        $project: {
          id: 1,
          "school_general_info.school_name": 1,
          "school_general_info.id": 1,
          "school_general_info.country": 1,
          total_student: 1,
          "school_logo.logo": 1,
        },
      },
    ]);
    console.log(random_schools);
    if (random_schools.length > 0) {
      return random_schools;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  get_school_info_by_id,
  discover_all_schools,
  get_random_schools,
};
