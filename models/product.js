const fs = require("fs");
const path = require("path");

const rootDirectory = require("../util/path");

const dataPath = path.join(rootDirectory, "data", "products.json");

const getProductsFromFile = callback => {
  fs.readFile(dataPath, (err, content) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(content));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(dataPath, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
