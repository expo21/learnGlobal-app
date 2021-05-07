const ProgramCourse = require("../models/programCourses.model");
const SchoolGeneraLInfo = require("../models/school_general_info.model");

// get course by id
const get_course_by_id = async (id) => {
  try {
    let course = await ProgramCourse.aggregate([
      {
        $match: { id },
      },
      {
        $lookup: {
          from: "ProgramsFees",
          localField: "id",
          foreignField: "programs_course_id",
          as: "feesInfo",
        },
      },
      {
        $lookup: {
          from: "SchoolGeneralInfo",
          localField: "school_id",
          foreignField: "id",
          as: "school_info",
        },
      },
      {
        $lookup: {
          from: "ProgramsTime",
          localField: "feesInfo.id",
          foreignField: "programs_fees_id",
          as: "course_time",
        },
      },
      { $unwind: "$feesInfo" },
      { $unwind: "$school_info" },
      { $unwind: "$course_time" },
      {
        $project: {
          course: 1,
          program_description: 1,
          duration: 1,
          admission_requirements: 1,
          "feesInfo.other_fees": 1,
          "feesInfo.application_fees": 1,
          "feesInfo.living_cost": 1,
          "feesInfo.pay_tuition": 1,
          "school_info.school_name": 1,
          "school_info.country": 1,
          "school_info.country_logo": 1,
          "course_time.start_program": 1,
        },
      },
    ]);
    return course[0];
  } catch (error) {
    console.log(error);
  }
};

//check eligibility
const check_eligibility = async (queryObj) => {
  try {
    let {
      program_level,
      grade_average,
      reading,
      writing,
      listening,
      speaking,
      country_education,
      stream_id,
      exam_type,
    } = queryObj;
    console.log(writing);
    let streams =
      stream_id === "All"
        ? await ProgramCourse.distinct("stream_id")
        : stream_id.split(",");
    console.log(streams);
    let required_band;
    let courseFilter = [];
    if (exam_type === "no") {
      courseFilter.push(
        {
          percentage_required: {
            $lte: grade_average,
          },
        },
        {
          program_level: program_level,
        },
        {
          stream_id: { $in: streams },
        }
      );
    } else {
      if (
        reading !== undefined &&
        writing !== undefined &&
        listening !== undefined &&
        speaking !== undefined
      ) {
        required_band =
          (parseInt(reading) +
            parseInt(writing) +
            parseInt(listening) +
            parseInt(speaking)) /
          4;
        if (required_band < 5.5) {
          throw new Error("Not eligible.");
        } else {
          courseFilter.push(
            {
              percentage_required: {
                $lte: grade_average,
              },
            },
            {
              program_level: program_level,
            },
            {
              stream_id: { $in: streams },
            },
            {
              band_required: {
                $lte: required_band.toString(),
              },
            }
          );
        }
      } else {
        throw new Error("Required IELTS details.");
      }
    }
    console.log(courseFilter);
    let response = await SchoolGeneraLInfo.aggregate([
      {
        $match:
          country_education !== "All"
            ? {
                country: country_education,
              }
            : {},
      },
      {
        $lookup: {
          from: "SchoolAbout",
          localField: "id",
          foreignField: "school_genral_id",
          as: "aboutschool",
        },
      },
      {
        $lookup: {
          from: "SchoolLogo",
          localField: "id",
          foreignField: "school_about_id",
          as: "school_logo",
        },
      },
      {
        $lookup: {
          from: "ProgramsCourse",
          let: { id: "$id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$school_id", "$$id"] },
                $and: courseFilter,
              },
            },
          ],
          as: "program",
        },
      },
      { $unwind: "$aboutschool" },
      { $unwind: "$school_logo" },
      {
        $project: {
          id: 1,
          school_name: 1,
          country: 1,
          country_logo: 1,

          "aboutschool.total_student": 1,
          "school_logo.founded": 1,
          program: 1,
        },
      },
    ]);

    let resa = response.filter((school) => {
      return school.program.length > 0;
    });

    if (resa.length > 0) {
      return resa;
    } else {
      throw new Error("Somethiing went wrong.");
    }
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

//check eligible programs
const check_programs = async (id) => {
  try {
    // let response = await ProgramCourse.aggregate([
    //   { $match: { school_id: id } },
    // ]);
    let response = await ProgramCourse.find({ school_id: id });
    return response;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

module.exports = {
  get_course_by_id,
  check_eligibility,
  check_programs,
};
