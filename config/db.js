const mongoose = require("mongoose");

const DB = process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("DB Connected successfully");
    })
    .catch((err) => console.log(err));
};

module.exports = connectDB;
