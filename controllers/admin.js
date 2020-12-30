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

exports.exeGetToPutProduct = (req, res, next) => {
  console.log("Get product To Put");

  productObj.getAllProducts((products) => {
    console.log("Product list" + products);
    res.render("admin/products", {
      pageTitle: "Edit Product",
      prods: products,
      pageName: "editProduct",
      catelog: true,
    });
  });
};

exports.exePutProduct = (req, res, next) => {
  console.log("Put this product");
};
