const fs = require("fs");
const path = require("path");
const { v4 : uuidv4 } = require("uuid");

const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

//const products = [];
const getProductFromFile = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    console.log("Reading file ***");
    if (err) {
      callback([]);
    }
    //console.log(JSON.parse(fileContent));
    let products = [];
    if (fileContent) {
      products = JSON.parse(fileContent);
    }
    callback(products);
  });
};
module.exports = class product {
  // constructor(productTitle){
  //     this.title = productTitle;
  // }

  constructor(productTitle, ProductCost, ProductDesc, ProductURL) {
    this.title = productTitle;
    this.cost = ProductCost;
    this.description = ProductDesc;
    this.url = ProductURL;
  }

  save() {
    this.id = uuidv4();
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static getAllProducts(callback) {
    getProductFromFile(callback);
  }

  static findProductByID(id, callback) {
    getProductFromFile(products => {
        const product = products.find(p => p.id === id );
        callback(product);
    });      
  }

};
