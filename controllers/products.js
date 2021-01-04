const productObj = require("../models/product");
const cartObj = require("../models/cart");

exports.exeGetProducts = (req, res, next) => {
  console.log("This is product page!!!");
  //res.send('<form method="POST", action="./product"><input type="Text" name="Title"><button type="Submit">Add product</button></form>');
  //res.sendFile(path.join(rootPath,'views','addproduct.html')); // This is HTML file
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    pageName: "product",
    addproduct: true,
  });
};

exports.exeGetProduct = (req, res, next) =>{
    const productID = req.params.productid;
    console.log(productID);
    productObj.findProductByID(productID, product =>{
        res.render("shop/product-details",{
            pageTitle: "Product Details",
            pageName: "pageDetails",
            product : product
        })
    });
}

exports.exeShowProductCatelog = (req, res, next) => {
  console.log("This is catelog !!!");
  //res.sendFile(path.join(rootPath,'views','catelog.html'));
  //const products = adminRoute.products;

  productObj.getAllProducts((products) => {
    console.log("Product list" + products);
    res.render("shop/catelog", {
      pageTitle: "Catelog",
      prods: products,
      doctTitle: "Shopping Catalog",
      pageName: "catelog",
      hasProduct: products.length > 0,
      catelog: true,
    });
  });
};

exports.exeGetCart = (req, res, next) => {
  console.log("This is cart page");
  res.render("shop/cart", {
    pageTitle: "Cart",
    pageName: "cart"
  });
};

exports.exePostCart = (req, res, next) =>{
    console.log("Post request for Cart");
    const productID = req.body.productID;
    productObj.findProductByID(productID, (product) => {
        cartObj.addProduct(product);
    });
    console.log(productID);
    res.render("shop/cart", {
        pageTitle : "Cart",
        pageName : "cart",

    })
};

exports.exeOrders = (req, res, next) => {
  console.log("This is order page");
  res.render("shop/orders", {
    pageTitle: "Orders",
    pageName: "orders"
  });
};

exports.exeCheckout = (req, res, next) =>{
    console.log("This is check-out page");
    res.render("shop/checkout",{
        pageTitle: "Checkout",
        pageName: "checkout"
    });
}

exports.exeIndex = (req, res, next) => {
  console.log("This is index page");
  res.render("shop/index", {
    pageTitle: "Index",
    pageName: "index"
  });
};
