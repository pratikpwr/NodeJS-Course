const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

// to save image or files to server

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}-${file.originalname}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());

// to save image or files to server | single - single incoming file |  ('image') - name of parameter
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// this is for  CORS error
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
// });

// to access images - use whole url localhot:8080/images/fileName.jpg
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/posts", feedRoutes);
app.use("/auth", authRoutes);

// general middleware function to handle errors
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ status: status, message: message, data: data });
});

// connect to mongoose db cloud
mongoose
  .connect(
    "mongodb+srv://mongodb:mongodb@nodeblog.evthp.mongodb.net/blogAPI?retryWrites=true&w=majority"
  )
  .then((result) => {
    // if mongoose connected then start server
    app.listen(8080);
  })
  .catch((err) => console.log(err));
