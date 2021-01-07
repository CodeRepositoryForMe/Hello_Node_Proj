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
  // constructor(productTitle){
  //     this.title = productTitle;
  // }

  constructor(id, productTitle, ProductCost, ProductDesc, ProductURL) {
    this.id = id;
    this.title = productTitle;
    this.cost = ProductCost;
    this.description = ProductDesc;
    this.url = ProductURL;
  }

  save() {
    console.log("This is save");
    console.log(this.id);
    console.log(this.title);
    console.log(this.cost);
    if (this.id) {
      getProductFromFile((products) => {
        const productexistingProductIndex = products.findIndex(
          (p) => p.id === id
        );
        console.log("Index");
        console.log(productexistingProductIndex);
        console.log(products[productexistingProductIndex].id);
        if (!productexistingProductIndex) {
          console.log("Product not found");
        } else {
          console.log(
            " i am in Else i.e. valid index for update " + this.id + " product"
          );
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
  }

  static delete(prodID) {
    console.log("prodID");
    console.log(prodID);
    console.log("prodID");
    getProductFromFile((products) => {
      console.log(products.length);
      //const productIndex = products.findIndex((p) => { p.id === prodID });
      const updatedProducts = products.filter(prod => prod.id !== prodID);
      console.log(updatedProducts.length);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
        console.log(error);
      });
    //   console.log(productIndex);
    //   console.log(products[productIndex]);
    //   console.log(products.length);
    //   delete products[productIndex];
    //   console.log(products.length);
    //   console.log(products[productIndex]);

    //   fs.writeFile(filePath, JSON.stringify(products), (error) => {
    //     console.log(error);
    //   });
    });
  }

  static getAllProducts(callback) {
    getProductFromFile(callback);
  }

  static findProductByID(id, callback) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }
};
