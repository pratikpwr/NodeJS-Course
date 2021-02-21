// const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();


app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

// 404 Page Not Found use it at last
app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "./", "views", "page-not-found.html"));
  // res.status(404).send('<h1>Page Not Found</h1>');
});
// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);
