const fs = require("fs");
const path = require("path");

const cartDataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(inProd) {
    inProd.qty = 0;
    // fetch the previous cart data
    fs.readFile(cartDataPath, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(fileContent);
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
    }); 
  }

  static deleteProductFromCart(){
      
  }
};
