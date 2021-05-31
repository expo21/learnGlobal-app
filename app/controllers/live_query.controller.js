const LiveQuery = require("../models/live_query.model");
const { transporter } = require("../utils/helper/nodeMail");
const create_live_query = async (dataObj) => {
  try {
    //validate dataobj
    let newLiveQuery = new LiveQuery(dataObj);
    let savedLiveQuery = await newLiveQuery.save();
    if (savedLiveQuery) {
      let info = await transporter.sendMail({
        from: "rajat.expinator21@gmail.com",
        to: savedLiveQuery.email,
        subject: "test email",
        text: "Test Email.",
        html: `<b>Hey there! </b><br>Test email.<br/>`,
      });
      if (info) {
        return savedLiveQuery;
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  create_live_query,
};
