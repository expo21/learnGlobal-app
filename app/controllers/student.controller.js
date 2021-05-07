const Student = require("../models/student.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//register student
const register_student = async (dataObj) => {
  try {
    console.log(dataObj);
    dataObj.password = await bcrypt.hashSync(dataObj.password, saltRounds);
    let newStudent = new Student(dataObj);
    let savedStudent = await newStudent.save();
    console.log(savedStudent);
    return savedStudent;
  } catch (error) {
    console.log(error.message);
  }
};
//get student by email
const getStudentByEmail = async (email) => {
  try {
    let student = await Student.findOne({ email: email });
    return student;
  } catch (error) {
    console.log(error.message);
  }
};

//student login
const login_student = async (dataObj) => {
  try {
    let student = await getStudentByEmail(dataObj.email);
    let token;
    if (student) {
      if (bcrypt.compareSync(dataObj.password, student.password)) {
        token = jwt.sign({ studentId: student._id }, "keysecret", {
          expiresIn: "48h",
        });
      } else {
        throw new Error("Password not matched.");
      }
    } else {
      throw new Error("Invalid email.");
    }
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register_student,
  getStudentByEmail,
  login_student,
};
