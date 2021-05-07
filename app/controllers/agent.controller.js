const AgentInfo = require("../models/agent.model");
const { transporter } = require("../utils/helper/nodeMail");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const agent_by_email = async (email) => {
  try {
    let agent = await AgentInfo.findOne({ email: email });
    return agent;
  } catch (error) {
    throw error;
  }
};
//agent register
const register_agent = async (dataObj) => {
  try {
    //create agent password
    let otp = Math.floor(100000 + Math.random() * 900000);
    // dataObj.password = await bcrypt.hashSync(agent_password, saltRounds);
    // dataObj.password = "thisisis";
    let info = await transporter.sendMail({
      from: "rajat.expinator21@gmail.com",
      to: "titangit@yopmail.com",
      subject: "test email",
      text: "this is the text.",
      html: `<b>Hey there! </b><br> This is our first message sent ${agent_password} with Nodemailer<br/>`,
    });
    // let newAgent = new AgentInfo(dataObj);
    // let savedAgent = await newAgent.save();
    console.log(info);
    console.log(dataObj);
    return info;
    // return savedAgent;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  agent_by_email,
  register_agent,
};
