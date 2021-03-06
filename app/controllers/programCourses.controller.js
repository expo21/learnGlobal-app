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

    if (program_level >= 5) {
      program_level = "2";
    } else {
      program_level = "1";
    }
    let streams =
      stream_id === "All"
        ? await ProgramCourse.distinct("stream_id")
        : stream_id.split(",");

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
          "school_logo.logo": 1,
          "program.id": 1,
        },
      },
    ]);

    let resa = response.filter((school) => {
      return school.program.length > 0;
    });

    if (resa.length > 0) {
      let programsLength = resa
        .map((a) => {
          return a.program.length;
        })
        .reduce((total, value) => {
          return total + value;
        });

      return {
        testSchoolLogo: "algoma.png",
        programsLength: programsLength,
        schoolLength: resa.length,
        schools: resa,
      };
    } else {
      throw new Error("Somethiing went wrong.");
    }
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

//check eligible programs
const check_programs = async (query) => {
  let programs = query.programs.split(",");
  // console.log(programs);
  try {
    let response = await ProgramCourse.aggregate([
      { $match: { id: { $in: programs } } },
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
          from: "ProgramsTime",
          localField: "feesInfo.id",
          foreignField: "programs_fees_id",
          as: "course_time",
        },
      },
      { $unwind: "$feesInfo" },
      { $unwind: "$course_time" },
      {
        $project: {
          id: 1,
          course: 1,
          duration: 1,
          percentage_required: 1,
          band_required: 1,
          tuition: 1,
          feesInfo: 1,
          course_time: 1,
        },
      },
    ]);
    // let response = await ProgramCourse.find({ school_id: id });

    return response;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

//get random courses
const get_random_courses = async () => {
  try {
    let random_courses = await ProgramCourse.aggregate([
      { $sample: { size: 10 } },

      {
        $lookup: {
          from: "SchoolGeneralInfo",
          localField: "school_id",
          foreignField: "id",
          as: "school_details",
        },
      },
      {
        $lookup: {
          from: "ProgramsFees",
          localField: "id",
          foreignField: "programs_course_id",
          as: "fees",
        },
      },
      {
        $lookup: {
          from: "SchoolAbout",
          localField: "school_details.id",
          foreignField: "school_genral_id",
          as: "school_about",
        },
      },
      {
        $lookup: {
          from: "SchoolLogo",
          localField: "school_details.id",
          foreignField: "school_about_id",
          as: "school_logo",
        },
      },
      { $unwind: "$fees" },
      { $unwind: "$school_details" },
      { $unwind: "$school_about" },
      { $unwind: "$school_logo" },

      {
        $project: {
          id: 1,
          course: 1,
          country: 1,
          country_logo: 1,
          "school_details.country": 1,
          "school_details.country_logo": 1,
          "school_details.school_name": 1,
          "school_details.id": 1,
          "fees.application_fees": 1,
          "school_about.total_student": 1,
          "school_about.int_student": 1,
          "school_logo.logo": 1,
        },
      },
    ]);
    if (random_courses.length > 0) {
      return random_courses;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  get_course_by_id,
  check_eligibility,
  check_programs,
  get_random_courses,
};
