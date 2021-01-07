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
    (id = null),
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

exports.exeGetToUpdateProduct = (req, res, next) => {
  console.log("Update this product!!");
  console.log(req.params.productid);
  const productID = req.params.productid;
  console.log(productID);
  productObj.findProductByID(productID, (product) => {
    console.log(product);
    res.render("admin/edit-product", {
      pageTitle: "Update Product",
      prod: product,
      pageName: "updateProduct",
    });
  });
};

exports.exePutProduct = (req, res, next) => {
  console.log("Put this product");
  console.log(req.body.productid);
  const product = new productObj(
    (id = req.body.productid),
    (title = req.body.Title),
    (cost = req.body.Cost),
    (description = req.body.Description),
    (url = req.body.ProductLink)
  );

  product.save();

  res.redirect('/editProduct');
//   const products = productObj.getAllProducts((products) => {
//     res.render("admin/products", {
//       pageTitle: "Edit Product",
//       prods: products,
//       pageName: "editProduct",
//       catelog: true,
//     });
//   });
};

exports.exeDeleteProduct = (req, res, next) =>{
    console.log("This is delete ");
    console.log(req.body.productid);
    const productID = req.body.productid;
    console.log(productID);
    productObj.delete(productID);
    res.redirect('/editProduct');
}; 
