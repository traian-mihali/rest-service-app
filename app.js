const mongoose = require("mongoose");
const debug = require("debug")("app:startup");
const helmet = require("helmet");
const config = require("config");
const morgan = require("morgan");
const genres = require("./routes/genres");
const home = require("./routes/home");
const express = require("express"); //returns a function
const app = express(); // returns an object

mongoose
  .connect(
    `mongodb://localhost/vidly`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Error", err.message));

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/api/genres", genres);
app.use("/", home);
app.use(express.static("./public"));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan is enabled...");
}
//Configuration
// console.log(`Application Name: ${config.get("name")}`);
// console.log(`Mail Server password: ${config.get("mail.password")}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
