const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const app = express();

console.log("MONGO_URI :", MONGO_URI);
app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter);

mongoose.connect(MONGO_URI).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// 라우터
app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port 5001`);
});
