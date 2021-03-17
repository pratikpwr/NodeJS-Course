const fs = require("fs");
const path = require("path");
const dirName = require("../util/path");

const filePath = path.join(dirName, "Data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log("Save product: " + err);
      });
    });
    // // products.push(this);
    // fs.readFile(p, (err, fileContent) => {
    //   let products = [];

    //   // copy content from file
    //   if (!err) {
    //     products = JSON.parse(fileContent);
    //   }

    //   // add new product to array
    //   products.push(this);

    //   // add newly array to file
    //   fs.writeFile(p, JSON.stringify(products), (err) => {
    //     console.log("save product: " + err);
    //   });
    // });
  }

  static fetchAll(cb) {
    // we use callback function here due to async code
    getProductsFromFile(cb);
  }
};
