const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = 4242;
//app init
const app = express();

//use middlewares
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

//cors
app.use(cors());

// connect to database
const mongoose = require("mongoose");
const dbConfig = require("./config/dbConfig");
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to database.");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// app.get("/home", (req, res) => {
//   console.log("hdfgjsgf");
//   res.send({ message: "sdhjdgdfjshd" });
// });

//require student routes
require("./app/routes/student.route")(app);
//require agent routes
require("./app/routes/agent.route")(app);
//require liveQuery routes
require("./app/routes/live_query.route")(app);

//require counties route
require("./app/routes/country_page.route")(app);

//require courses route
require("./app/routes/programCourse.route")(app);

//require school routes
require("./app/routes/school_general_info.route")(app);

//require countries routes
require("./app/routes/country.route")(app);

//listen server
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${process.env.PORT || PORT}`);
});
