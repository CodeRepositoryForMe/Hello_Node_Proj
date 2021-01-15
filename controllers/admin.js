const productObj = require("../models/product");

// Add product to Catelog
exports.exePostProducts = (req, res, next) => {
  console.log("Add product to Catelog !!");
  const product = new productObj(
    (id = null),
    (title = req.body.Title),
    (cost = req.body.Cost),
    (description = req.body.Description),
    (url = req.body.ProductLink)
  );

  product.save();

  product
    .saveInDB()
    .then(() => {
      console.log("Added !!!!");
      console.log("Product added to Catelog successfully !!");
      res.redirect("/catelog");
    })
    .catch((err) => {
        console.log("Error here");
      console.log(err);
    });
};

// Get list of products to select product for update
exports.exeGetToPutProduct = (req, res, next) => {
  console.log("Update existing product !!");
  productObj.getAllProducts((products) => {
    res.render("admin/products", {
      pageTitle: "Edit Product",
      prods: products,
      pageName: "editProduct",
      catelog: true,
    });
  });
};

// Get selected product details
exports.exeGetToUpdateProduct = (req, res, next) => {
  console.log("Show selected product details!!");
  console.log(req.params.productid);
  const productID = req.params.productid;
  productObj.findProductByID(productID, (product) => {
    //console.log(product);
    res.render("admin/edit-product", {
      pageTitle: "Update Product",
      prod: product,
      pageName: "updateProduct",
    });
  });
};

// Update selected product in product catelog
exports.exePutProduct = (req, res, next) => {
  console.log("Update this product");
  console.log(req.body.productid);

  // Init product object with productID
  const product = new productObj(
    (id = req.body.productid),
    (title = req.body.Title),
    (cost = req.body.Cost),
    (description = req.body.Description),
    (url = req.body.ProductLink)
  );

  product.save();

  res.redirect("/editProduct");
};

// Delete selected product from product catelog
exports.exeDeleteProduct = (req, res, next) => {
  console.log("Delete this product");
  console.log(req.body.productid);
  const productID = req.body.productid;
  productObj.delete(productID);
  res.redirect("/editProduct");
};
