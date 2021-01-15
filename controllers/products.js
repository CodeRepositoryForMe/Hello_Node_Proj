const productObj = require("../models/product");
const cartObj = require("../models/cart");

// Get all products
exports.exeGetProducts = (req, res, next) => {
  console.log("This is product page!!!");
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    pageName: "product",
    addproduct: true,
  });
};

// Get product by ID
exports.exeGetProduct = (req, res, next) => {
  const productID = req.params.productid;
  console.log(productID);
  //   productObj.findProductByID(productID, (product) => {
  //     res.render("shop/product-details", {
  //       pageTitle: "Product Details",
  //       pageName: "pageDetails",
  //       product: product,
  //     });
  console.log("aloy");
  productObj
    //.findDataByIDFromDB(productID)        // PURE - DB Method
    .findAll({
      where: { id: productID},
      raw: true,
    })
    //.findByPk(productID)
    .then((row) => {
      console.log(row);
      //console.log(row[0][0]); // PURE DB result set
      res.render("shop/product-details", {
        pageTitle: "Product Details",
        pageName: "pageDetails",
        //product: row[0][0], // PURE DB result set
        product: row[0]
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Show all product in catelog
exports.exeShowProductCatelog = (req, res, next) => {
  console.log("Catelog page here !!!");
  //res.sendFile(path.join(rootPath,'views','catelog.html'));
  //const products = adminRoute.products;

  //   productObj.getAllProducts((products) => {
  //     res.render("shop/catelog", {
  //       pageTitle: "Catelog",
  //       prods: products,
  //       doctTitle: "Shopping Catalog",
  //       pageName: "catelog",
  //       hasProduct: products.length > 0,
  //       catelog: true,
  //     });
  //   });

  //// This pure DB code to fetch all products
  //   productObj
  //     .fetchDataFromDB()
  //     .then(([rows, files]) => {
  //       res.render("shop/catelog", {
  //         pageTitle: "Catelog",
  //         prods: rows,
  //         doctTitle: "Shopping Catalog",
  //         pageName: "catelog",
  //         hasProduct: rows.length > 0,
  //         catelog: true,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  productObj
    .findAll({
      raw: true,
    })
    .then((products) => {
      console.log("Done");
      console.log(products);
      res.render("shop/catelog", {
        pageTitle: "Catelog",
        prods: products,
        doctTitle: "Shopping Catalog",
        pageName: "catelog",
        hasProduct: products.length > 0,
        catelog: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get all products from catr file
exports.exeGetCart = (req, res, next) => {
  console.log("Cart page here !!!");
  cartObj.getCart((cart) => {
    res.render("shop/cart", {
      pageTitle: "Cart",
      cart: cart,
      pageName: "cart",
    });
  });
};

// Add product to cart
exports.exePostCart = (req, res, next) => {
  console.log("Post request for Cart");
  const productID = req.body.productID;
  productObj.findProductByID(productID, (product) => {
    console.log(productID);
    cartObj.addProduct(product, () => {
      console.log("In Callback");
      console.log(productID);
      cartObj.getCart((cart) => {
        res.render("shop/cart", {
          pageTitle: "Cart",
          pageName: "cart",
          cart: cart,
        });
      });
    });
  });
};

// Delete selected product
exports.exeDeleteCartProduct = (req, res, next) => {
  console.log("Delete this product !!");
  const productID = req.params.productid;
  console.log(productID);
  cartObj.deleteProductFromCart(productID, () => {
    cartObj.getCart((cart) => {
      res.render("shop/cart", {
        pageTitle: "Cart",
        pageName: "cart",
        cart: cart,
      });
    });
  });
};

exports.exeOrders = (req, res, next) => {
  console.log("This is order page");
  res.render("shop/orders", {
    pageTitle: "Orders",
    pageName: "orders",
  });
};

exports.exeCheckout = (req, res, next) => {
  console.log("This is check-out page");
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    pageName: "checkout",
  });
};

exports.exeIndex = (req, res, next) => {
  console.log("This is index page");
  productObj
    .fetchDataFromDB()
    .then(([rows, fieldData]) => {
      console.log(rows);
      res.render("shop/index", {
        pageTitle: "Index",
        pageName: "index",
        prods: rows,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
