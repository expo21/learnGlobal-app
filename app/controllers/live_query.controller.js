const LiveQuery = require("../models/live_query.model");

const create_live_query = async (dataObj) => {
  try {
    //validate dataobj
    let newLiveQuery = new LiveQuery(dataObj);
    let savedLiveQuery = await newLiveQuery.save();
    return savedLiveQuery;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create_live_query,
};
