const Stream = require("../models/stream.model");

//get streams
const get_streams = async () => {
  try {
    let result = await Stream.find();
    return result;
  } catch (error) {}
};

module.exports = {
  get_streams,
};
