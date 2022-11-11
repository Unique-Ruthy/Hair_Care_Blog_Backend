const express = require("express");
const app = express();
const port = 5000;
//loads data from env variable
require("dotenv").config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "/images")));

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Amara:paragon1@myblogdb.2anjjzq.mongodb.net/blog?retryWrites=true&w=majority",
  function (err) {
    if (err) {
      console.error("Failed to connect to DB", err);
    } else {
      console.log("Database connected successfully");
    }
  }
);

// for uploading images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // req.body.name sends the image to reaactjs(frontend)
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaed");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(port, () => {
  console.log("Backend is running on", port);
});
