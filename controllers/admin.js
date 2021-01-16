const productObj = require("../models/product");
const { v4: uuidv4 } = require("uuid");

// Add product to Catelog
exports.exePostProducts = (req, res, next) => {
  console.log("Add product to Catelog !!");

  //// PURE - DB code to create record
  //   const product = new productObj(
  //     (id = null),
  //     (title = req.body.Title),
  //     (cost = req.body.Cost),
  //     (description = req.body.Description),
  //     (url = req.body.ProductLink)
  //   );

  //// Code to save record in file
  //   product.save();

  //// Code to save record in DB
  //   product
  //     .saveInDB()
  //     .then(() => {
  //       console.log("Added !!!!");
  //       console.log("Product added to Catelog successfully !!");
  //       res.redirect("/catelog");
  //     })
  //     .catch((err) => {
  //         console.log("Error here");
  //       console.log(err);
  //     });

  //// Sequelize - Code to create record
  productObj
    .create({
      id: uuidv4(),
      title: req.body.Title,
      cost: req.body.Cost,
      description: req.body.Description,
      url: req.body.ProductLink,
      UserId: req.loggedUser.id,
    })
    .then((result) => {
      //console.log(result);
      res.redirect("/catelog");
    })
    .catch((err) => {
      console.log(err);
    });

  //// Advantage of Association
  //   console.log(req.loggedUser);
  //   req.loggedUser
  //     .create({
  //       product: {
  //         id: uuidv4(),
  //         title: req.body.Title,
  //         cost: req.body.Cost,
  //         description: req.body.Description,
  //         url: req.body.ProductLink,
  //       },
  //     })
  //     .then((result) => {
  //       //console.log(result);
  //       res.redirect("/catelog");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
};

// Get list of products to select product for update
exports.exeGetToPutProduct = (req, res, next) => {
  console.log("Update existing product !!");

  //// PURE - DB Code to fetch all records
  //   productObj.getAllProducts((products) => {
  //     res.render("admin/products", {
  //       pageTitle: "Edit Product",
  //       prods: products,
  //       pageName: "editProduct",
  //       catelog: true,
  //     });
  //   });

  //// Sequelize - code to fetch all records
  productObj
    .findAll({ raw: true })
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Edit Product",
        prods: products,
        pageName: "editProduct",
        catelog: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get selected product details
exports.exeGetToUpdateProduct = (req, res, next) => {
  console.log("Show selected product details!!");
  console.log(req.params.productid);
  const productID = req.params.productid;

  //// PURE DB code to fetch single record
  //   productObj.findProductByID(productID, (product) => {
  //     //console.log(product);
  //     res.render("admin/edit-product", {
  //       pageTitle: "Update Product",
  //       prod: product,
  //       pageName: "updateProduct",
  //     });
  //   });

  //// Sequelize - code to fetch single record
  productObj
    .findByPk(productID)
    .then((result) => {
      //console.log(product);
      res.render("admin/edit-product", {
        pageTitle: "Update Product",
        prod: result,
        pageName: "updateProduct",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update selected product in product catelog
exports.exePutProduct = (req, res, next) => {
  console.log("Update this product");
  console.log(req.body.productid);

  //// PURE - DB Code to update Record
  // Init product object with productID
  //   const product = new productObj(
  //     (id = req.body.productid),
  //     (title = req.body.Title),
  //     (cost = req.body.Cost),
  //     (description = req.body.Description),
  //     (url = req.body.ProductLink)
  //   );
  //   product.save();
  //   res.redirect("/editProduct");

  //// Sequelize - Code to update record
  productObj
    .findByPk(req.body.productid)
    .then((result) => {
      if (result) {
        return result.update({
          id: req.body.productid,
          title: req.body.Title,
          cost: req.body.Cost,
          description: req.body.Description,
          url: req.body.ProductLink,
        });
      } else {
        console.log("Invalid product");
      }
    })
    .then((result) => {
      //console.log("***"+result);
      console.log("Record updated");
      res.redirect("/editProduct");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete selected product from product catelog
exports.exeDeleteProduct = (req, res, next) => {
  console.log("Delete this product");
  console.log(req.body.productid);
  const productID = req.body.productid;

  //// PURE - code to delete record
  //   productObj.delete(productID);
  //   res.redirect("/editProduct");

  //// Sequelize - code to delete record
  productObj
    .findByPk(productID)
    .then((result) => {
      if (result) {
        return result.destroy();
      } else {
        console.log("Record not found");
      }
    })
    .then((result) => {
      //console.log(result);
      console.log("Record Deleted");
      res.redirect("/editProduct");
    })
    .catch((err) => {
      console.log(err);
    });
};
