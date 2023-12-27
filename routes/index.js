const express = require("express");
//const User = require("../models/user");
const User = require("../schemas/user");

const router = express.Router();

// mariaDB
// router.get("/", async (req, res, next) => {
//   try {
//     const users = await User.findAll();
//     res.render("sequelize", { users });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// mongodb
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.render("mongoose", { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
