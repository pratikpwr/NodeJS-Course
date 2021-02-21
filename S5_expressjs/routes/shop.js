const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");

const router = express.Router();

// if we use 'use' in place of get - the 404 page will not shown but only this page will be shown
router.get("/", (req, res) => {
  // console.log("In the another middleware!");
  // res.send('<h2>Home Page</h2>');
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
