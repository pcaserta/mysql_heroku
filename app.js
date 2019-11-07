//load our app server using express
const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public"));

app.use(morgan("short"));





app.get("/", (req, res) => {
  console.log("Responding to root route");
  res.send("Hello from roooooot");
});

const router = require("./routes/user.js");

app.use(router);

//server runnig on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`app listening on port ${port}...`);
});
