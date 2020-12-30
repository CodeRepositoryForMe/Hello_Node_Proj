const productObj = require("../models/product");

exports.exePostProducts = (req, res, next) => {
  console.log("Product Added !!!");
  console.log(req.body);
  //res.redirect("/catelog");
  // products.push({
  //   title: req.body.Title,
  //   cost: req.body.Cost,
  //   description: req.body.Description,
  //   url: req.body.ProductLink,
  // });
  const product = new productObj(
    (title = req.body.Title),
    (cost = req.body.Cost),
    (description = req.body.Description),
    (url = req.body.ProductLink)
  );

  product.save();

  console.log("From Add Product " + product);
  //res.sendFile(path.join(rootPath,'views','catelog.html'));  // This is HTML file
  //https://elcopcbonline.com/photos/product/4/176/4.jpg
  res.redirect("/catelog");
};

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

exports.exeCart = (req, res, next) => {
  console.log("This is cart page");
  res.render("shop/cart", {
    pageTitle: "Cart",
    pageName: "cart"
  });
};

exports.exeOrder = (req, res, next) => {
  console.log("This is order page");
  res.render("shop/order", {
    pageTitle: "Order",
    pageName: "order"
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
