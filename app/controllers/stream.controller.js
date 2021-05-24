const Stream = require("../models/stream.model");

//get streams
const get_streams = async () => {
  try {
    let result = await Stream.find({});
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  get_streams,
};
