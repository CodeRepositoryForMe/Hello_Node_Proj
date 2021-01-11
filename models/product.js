const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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
  // Init product with given data
  constructor(id, productTitle, ProductCost, ProductDesc, ProductURL) {
    this.id = id;
    this.title = productTitle;
    this.cost = ProductCost;
    this.description = ProductDesc;
    this.url = ProductURL;
  }

  // Save this data
  save() {
    console.log("Save operation start !!!");
    if (this.id) {
      getProductFromFile((products) => {
        const productexistingProductIndex = products.findIndex(
          (p) => p.id === id
        );
        if (!productexistingProductIndex) {
          console.log("Product not found");
        } else {
          products[productexistingProductIndex] = this;
          fs.writeFile(filePath, JSON.stringify(products), (err) => {
            console.log(err);
          });
        }
      });
    } else {
      this.id = uuidv4();
      getProductFromFile((products) => {
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      });
    }
    console.log("Save operation completed !!!");
  }

  // Delete selected product from product collection
  static delete(prodID) {
    console.log("Delete operation start !!");
    getProductFromFile((products) => {
      //const productIndex = products.findIndex((p) => { p.id === prodID });
      const updatedProducts = products.filter((prod) => prod.id !== prodID);
      console.log(updatedProducts.length);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
        console.log(error);
      });
    });
    console.log("Delete operation completed !!");
  }

  // Get all products
  static getAllProducts(callback) {
    getProductFromFile(callback);
  }

  // Find product by ID
  static findProductByID(id, callback) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }
};
