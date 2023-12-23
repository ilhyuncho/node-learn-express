const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  //res.end("hello, User");
  res.render("index", { title: "pug test" });
});
// or
router
  .route("/abc")
  .get((req, res) => {
    res.send("GET /abc");
  })
  .post((req, res) => {
    res.send("POST /abc");
  });

module.exports = router;
