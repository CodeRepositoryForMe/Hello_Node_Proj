const fs = require("fs");
const path = require("path");

const cartDataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(inProd, callback) {
    inProd.qty = 0;
    // fetch the previous cart data
    fs.readFile(cartDataPath,"utf8", (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        console.log(fileContent);
        if (fileContent) {
          cart = JSON.parse(fileContent);
        }
      } else {
        console.log(error);
      }
      // Analyze the cart => Find for existing product
      let existingProductIndex = 0;
      let existingProduct = inProd;
      if (cart.products.length > 0) {
        existingProductIndex = cart.products.findIndex(
          (prod) => prod.id == inProd.id
        );
        existingProduct = cart.products[existingProductIndex];
      }
      let updatedProduct;
      if (existingProduct) {
        let existingQty = existingProduct.qty;
        updatedProduct = existingProduct;
        cart.products[existingProductIndex] = updatedProduct;
        cart.products[existingProductIndex].qty = existingQty + +1;
      } else {
        updatedProduct = inProd;
        updatedProduct.qty = 1;
        cart.products.push(updatedProduct);
      }
      cart.totalPrice = cart.totalPrice + +inProd.cost;
      fs.writeFile(cartDataPath, JSON.stringify(cart), (error) => {
        console.log(error);
      });
      callback();
    });
  }

  static deleteProductFromCart(prodID, callback) {
    fs.readFile(cartDataPath, (error, fileContent) => {
      if (error) {
        return;
      }
      console.log("File read Complete");
      let cart = JSON.parse(fileContent);
      console.log(cart.totalPrice);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((prod) => prod.id === prodID);
      if (!product) {
        console.log("Invalid Product");
        return;
      }
      console.log("QTY:" + product.qty);
      const prodQty = product.qty;
      const updatedTotalPrice =
        updatedCart.totalPrice - product.cost * prodQty;
        updatedCart.products = cart.products.filter(
        (prod) => prod.id !== prodID
      );
      updatedCart.totalPrice = updatedTotalPrice;
      console.log(updatedCart.products.length);
      fs.writeFile(cartDataPath, JSON.stringify(updatedCart), (error) => {
        console.log(error);
      });
      callback();
    });
  }

  static getCart(callback) {
    fs.readFile(cartDataPath,"utf8", (error, fileContent) => {
      if (error) {
        callback(null);
      }
      if (fileContent){
        let cart = JSON.parse(fileContent);
        callback(cart);
      } else {
        callback(null);
      }
    });
  }
};
