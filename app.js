const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/home", (req, res) => {
  console.log("hdfgjsgf");
  res.send({ message: "sdhjdgdfjshd" });
});
app.listen(3636, () => {
  console.log(`server running on port 3636`);
});
