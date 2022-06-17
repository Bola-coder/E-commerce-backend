const dotenv = require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db.js");

const port = process.env.PORT || 8000;
connectDB();

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
