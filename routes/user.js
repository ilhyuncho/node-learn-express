const express = require("express");
const User = require("../models/user");
const Comment = require("../models/comment");

const router = express.Router();

// router.get("/", (req, res) => {
//   //res.end("hello, User");
//   res.render("index", { title: "pug test" });
// });
// // or
// router
//   .route("/abc")
//   .get((req, res) => {
//     res.send("GET /abc");
//   })
//   .post((req, res) => {
//     res.send("POST /abc");
//   });

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      console.log("user.post~~~");
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      next(err);
    }
  });

router.get("/:id/comments", async (req, res, next) => {
  try {
    console.log("gdfgdfgdfgd");
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
