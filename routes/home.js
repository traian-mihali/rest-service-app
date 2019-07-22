const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Vidly Home page");
// });

router.get("/", (req, res) => {
  res.render("index", { title: "My App", message: "HOME" });
});

module.exports = router;
