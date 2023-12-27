const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  const mongodbUri =
    "mongodb+srv://cihg155:2ObxZj5Zvb5p5d1C@cluster0.wd3jibr.mongodb.net/?retryWrites=true&w=majority";

  mongoose
    .connect(mongodbUri)

    .then(console.log("Connected to MongoDB"))
    .catch((e) => console.log(e));
};

module.exports = connect;
