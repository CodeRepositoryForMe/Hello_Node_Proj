const fs = require("fs");
const path = require("path");

/// Cart file path to store cart details i.e. products and total price
const cartDataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  // Get existing cart data
  static getCart(callback) {
    fs.readFile(cartDataPath, "utf8", (error, fileContent) => {
      if (error) {
        callback(null);
      }
      if (fileContent) {
        let cart = JSON.parse(fileContent);
        callback(cart);
      } else {
        callback(null);
      }
    });
  }

  /// Add product in Cart
  static addProduct(inProd, callback) {
    // Need to add one attribute to store quantity of selected product
    inProd.qty = 0;
    // fetch the previous cart data
    fs.readFile(cartDataPath, "utf8", (error, fileContent) => {
      // init cart structure
      let cart = { products: [], totalPrice: 0 };
      // if no error and valid file content while reading file
      if (!error && fileContent) {
        cart = JSON.parse(fileContent);
      } else {
        console.log(error);
      }
      // Analyze the cart => Find for existing product
      let existingProductIndex = 0;
      let existingProduct = inProd; // by default set value to new product
      // if cart exist, find selected product from data
      if (cart.products.length > 0) {
        existingProductIndex = cart.products.findIndex(
          (prod) => prod.id == inProd.id
        );
        existingProduct = cart.products[existingProductIndex];
      }
      let updatedProduct;
      // if selected product exist, update product quantity
      if (existingProduct) {
        let existingQty = existingProduct.qty;
        updatedProduct = existingProduct;
        cart.products[existingProductIndex] = updatedProduct;
        cart.products[existingProductIndex].qty = existingQty + +1;
      } else {
        // else add new product in cart
        updatedProduct = inProd;
        updatedProduct.qty = 1;
        cart.products.push(updatedProduct);
      }
      // update cart total as per added product
      cart.totalPrice = cart.totalPrice + +inProd.cost;

      // Save data with update / newly added data
      fs.writeFile(cartDataPath, JSON.stringify(cart), (error) => {
        console.log(error);
      });
      callback();
    });
  }

  /// Delete product from Cart
  static deleteProductFromCart(prodID, callback) {
    // Get existing data from Cart
    fs.readFile(cartDataPath, (error, fileContent) => {
      if (error) {
        return;
      }
      // Init cart with existing data
      let cart = JSON.parse(fileContent);
      // Create copy data from existing data
      const updatedCart = { ...cart };
      // Check for selected product from
      const product = updatedCart.products.find((prod) => prod.id === prodID);
      if (!product) {
        console.log("Invalid Product");
        return;
      }
      // Calculate cart total price as per deleted product
      const prodQty = product.qty;
      const updatedTotalPrice = updatedCart.totalPrice - product.cost * prodQty;

      // New copy product array = Get all products other that deleted product
      updatedCart.products = cart.products.filter((prod) => prod.id !== prodID);
      updatedCart.totalPrice = updatedTotalPrice;

      // Update file with New copy product array and calculated total price.
      fs.writeFile(cartDataPath, JSON.stringify(updatedCart), (error) => {
        console.log(error);
      });

      // call callback function, here to manage view after delete operation
      callback();
    });
  }
};
