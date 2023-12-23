const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.end("hello, User");
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
