const productObj = require("../models/product");
const cartObj = require("../models/cart");
const cartItemObj = require("../models/cartItem");
const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const Helper = require("../util/helper");
const sequelize = require("sequelize");
const Order = require("../models/order");

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
  //// Code - Fetch data from file
  //   productObj.findProductByID(productID, (product) => {
  //     res.render("shop/product-details", {
  //       pageTitle: "Product Details",
  //       pageName: "pageDetails",
  //       product: product,
  //     });

  productObj
    //// Code to fetch data from DB
    //.findDataByIDFromDB(productID)        // PURE - DB Method
    .findAll({
      where: { id: productID },
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
        product: row[0],
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

  //// Code to fetch data from file
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

  //// Pure DB code to fetch all products
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

  //// Sequelize - Code to fetch all product for catelog
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
  //// Get all cart products through "Include"
  return Cart.findAll({
    where: {
      id: req.loggedUserCart.id,
    },
    //attributes: ["id", "userId"],
    include: {
      model: Product,
      as: "productTbls",
      required: true,
      attribute: [],
    },
    //raw: true,
    //nest: true,
  })
    .then((cart) => {
      console.log(cart);
      console.log(cart[0].id);
      res.render("shop/cart", {
        pageTitle: "Cart",
        cart: cart[0],
        pageName: "cart",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add product to cart
exports.exePostCart = (req, res, next) => {
  console.log("Post request for Cart");
  const productID = req.body.productID;
  //// Code to add product in file , where file as DB
  //productObj.findProductByID(productID, (product) => {
  //console.log(productID);
  // cartObj.addProduct(product, () => {
  //   console.log("In Callback");
  //   console.log(productID);
  //   cartObj.getCart((cart) => {
  //     res.render("shop/cart", {
  //       pageTitle: "Cart",
  //       pageName: "cart",
  //       cart: cart,
  //     });
  //   });
  // });
  //});

  //   console.log(
  //     Object.getOwnPropertyNames(Product).filter(function (p) {
  //       return Product.associations;
  //     })
  //   );

  //   console.log("\nAssociations");
  //   for (let assoc of Object.keys(Cart.associations)) {
  //     for (let accessor of Object.keys(Cart.associations[assoc].accessors)) {
  //       console.log(
  //         Cart.name + "." + Cart.associations[assoc].accessors[accessor] + "()"
  //       );
  //     }
  //   }
  ///========================
  let fetchedCart;
  let newQuantity = 1;
  let oldQuantity = 0;
  let cartID;
  //User.getCart() // This should work need to check -- Issue4ME-3
  return Cart.findOne({
    include: [
      {
        model: Product,
        through: {
          where: {
            cartId: req.loggedUserCart.id,
            productTblId: productID,
          },
        },
      },
    ],
  })
    .then((cart) => {
      fetchedCart = cart;
      //console.log(cart.id);
      //console.log(cart.productTbls.length);
      console.log(cart.productTbls);
      console.log("Check for product In cart ");
      if (cart.productTbls.length > 0) {
        console.log("Product Exist .. Just Modifing ");
        console.log(cart.productTbls[0]);
        oldQuantity = cart.productTbls[0].cartItem.quantity;
        console.log(cart.productTbls[0].cartItem);
        console.log(cart.productTbls[0].quantity);
        console.log(cart.productTbls[0].cartItem.quantity);
        return cart.productTbls[0].cartItem
          .update({
            quantity: oldQuantity + newQuantity,
          })
          .then((cart) => {
            console.log("Update Cart 1");
            console.log(cart);
            return Cart.findAll({
              where: {
                id: req.loggedUserCart.id,
              },
              //attributes: ["id", "userId"],
              include: {
                model: Product,
                as: "productTbls",
                required: true,
                attribute: [],
                order: sequelize.literal("total DESC"),
              },
              //raw: true,
              //nest: true,
            });
          })
          .then((cart) => {
            console.log("cart 1");
            console.log(cart);
            console.log("cart [0] ------");
            console.log(cart[0]);
            console.log("cart[0].productTbls =======");
            console.log(cart[0].productTbls);
            console.log("cart.productTbls 1");
            //console.log(cart.productTbls);
            res.render("shop/cart", {
              pageTitle: "Cart",
              pageName: "cart",
              cart: cart[0],
            });
          });
      } else {
        console.log("Need to add new Product ");
        return Product.findByPk(productID).then((product) => {
          console.log("Find product in products Master");
          console.log(product);
          return fetchedCart
            .addProductTbls(product, {
              through: { id: uuidv4(), quantity: newQuantity },
            })
            .then((cart) => {
              console.log("Update Cart 2");
              console.log(cart);
              return Cart.findAll({
                where: {
                  id: req.loggedUserCart.id,
                },
                //attributes: ["id", "userId"],
                include: {
                  model: Product,
                  as: "productTbls",
                  required: true,
                  attribute: [],
                },
                //raw: true,
                //nest: true,
              });
            })
            .then((cart) => {
              console.log("cart 2");
              console.log(cart);
              console.log("cart [0] ------");
              console.log(cart[0]);
              console.log("cart[0].productTbls =======");
              console.log(cart[0].productTbls);
              console.log("cart.productTbls 2");
              //console.log(cart.productTbls);
              res.render("shop/cart", {
                pageTitle: "Cart",
                pageName: "cart",
                cart: cart[0],
              });
            });
        });
      }
      /* return cart.productTbls
        .findAll({ productTblId: productID })
        // .then((product) => {
        //   console.log("Available Product");
        //   console.log(product);
        //   if (product) {
        //     oldQuantity = product.quantity;
        //   }
        //   newQuantity = oldQuantity + 1;
        //   if (product) {
        //     return product;
        //   } else {
        //     console.log("Get New Product");
        //     return Product.findByPk(productID);
        //   }
          // if (cart.productTbls.length > 0) {
          //   product = cart.productTbls[0];
          // }
          //   let newQuantity = 1;
          //   if (product) {
          //     console.log("Existing product");
          //     console.log(product);
          //     console.log(product.cartItem);
          //     console.log(product.cartItem.quantity);
          //     const oldQty = product.cartItem.quantity;
          //     newQuantity = oldQty + 1;
          //     return product;
          //   }
          //   console.log("New product");
          //   return Product.findByPk(productID);
        })
        .then((product) => {
          console.log("Product in Queue");
          console.log(product);
          if (product)
            return fetchedCart.addProductTbls(product, {
              through: { id: uuidv4(), quantity: newQuantity },
            });
        })
        .then((fetchedCart) => {
          console.log("fetchedCart.productTbls");
          console.log(fetchedCart.productTbls);
          return Cart.findAll({
            include: [
              {
                model: Product,
                through: {
                  where: {
                    cartId: req.loggedUserCart.id,
                  },
                },
              },
            ],
          }).then((cart) => {
            console.log("cart.productTbls");
            console.log(cart.productTbls);
            res.render("shop/cart", {
              pageTitle: "Cart",
              pageName: "cart",
              cart: fetchedCart.productTbls,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });

      //   console.log("Product ---- >");
      //   console.log(product);
      //   console.log(product.id);
      */
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete selected product
exports.exeDeleteCartProduct = (req, res, next) => {
  console.log("Delete this product !!");
  const productID = req.params.productid;
  console.log(productID);

  //   cartObj.deleteProductFromCart(productID, () => {
  //     cartObj.getCart((cart) => {
  //       res.render("shop/cart", {
  //         pageTitle: "Cart",
  //         pageName: "cart",
  //         cart: cart,
  //       });
  //     });
  //   });
  // // //   console.log("\nAssociations");
  // // //   for (let assoc of Object.keys(User.associations)) {
  // // //     for (let accessor of Object.keys(
  // // //         User.associations[assoc].accessors
  // // //     )) {
  // // //       console.log(
  // // //         User.name +
  // // //           "." +
  // // //           User.associations[assoc].accessors[accessor] +
  // // //           "()"
  // // //       );
  // // //     }
  // // //   }
  console.log("Sart Delete operation");
  ////// This need to work but ..
  //   User
  //     .getCart(req.loggedUserCart.id)
  //     .then((cart) => {
  //       return cart.getProducts({ where: { id: productID } });
  //     })
  //     .then((products) => {
  //       const product = products[0];
  //       return product.cartItem.destroy();
  //     })
  //     .then((result) => {
  //       res.redirect("/cart");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  return Cart.findOne({
    include: [
      {
        model: Product,
        through: {
          where: {
            cartId: req.loggedUserCart.id,
            productTblId: productID,
          },
        },
      },
    ],
  }).then((cart) => {
    console.log("Find cart product for delete");
    console.log(cart);
    console.log(cart.productTbls[0]);
    console.log(cart.productTbls[0].cartItem);
    cart.productTbls[0].cartItem
      .destroy()
      .then(() => {
        console.log("Cart Item record deleted ");
        return Cart.findAll({
          where: {
            id: req.loggedUserCart.id,
          },
          //attributes: ["id", "userId"],
          include: {
            model: Product,
            as: "productTbls",
            required: true,
          },
          //raw: true,
          //nest: true,
        });
      })
      .then((cart) => {
        console.log("cart after delete");
        console.log(cart);
        console.log("cart [0] ------");
        console.log(cart[0]);
        console.log("cart[0].productTbls =======");
        console.log(cart[0].productTbls);
        console.log("cart.productTbls 2");
        //console.log(cart.productTbls);
        res.render("shop/cart", {
          pageTitle: "Cart",
          pageName: "cart",
          cart: cart[0],
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

exports.exePostOrders = (req, res, next) => {
  console.log("Welcome to Order");
  console.log(req.body.cartId);
  let fetchedCart;
  return Cart.findAll({
    where: {
      id: req.loggedUserCart.id,
    },
    //attributes: ["id", "userId"],
    include: {
      model: Product,
      as: "productTbls",
      required: true,
    },
    //raw: true,
    //nest: true,
  })
    .then((cart) => {
      fetchedCart = cart;
      console.log(cart);
      console.log(cart[0].productTbls);
      return Order.create({
        id: uuidv4(),
        UserId: req.loggedUser.id,
      }).then((order) => {
        console.log("Fetched Cart");
        console.log(fetchedCart[0]);
        console.log(fetchedCart[0].id);
        console.log("Cart Product");
        console.log(fetchedCart[0].productTbls);
        //console.log(fetchedCart[0].productTbls.map());
        console.log("Order looks like");
        console.log(order);
        //   console.log("\nAssociations");
        //   for (let assoc of Object.keys(Product.associations)) {
        //     for (let accessor of Object.keys(
        //         Product.associations[assoc].accessors
        //     )) {
        //       console.log(
        //         ProOrderItemduct.name +
        //           "." +
        //           OrderItem.associations[assoc].accessors[accessor] +
        //           "()"
        //       );
        //     }
        //   }
        //  console.log("=========");
        return order.addProductTbls(
          fetchedCart[0].productTbls.map((product) => {
            console.log("product need to add in Order");
            console.log(product);
            console.log(product.orderItem);
            console.log(
              "product.cartItem.quantity:" + product.cartItem.quantity
            );
            product.orderItem = {
              id: uuidv4(),
              quantity: product.cartItem.quantity,
            };
          })
        );
      }).catch((err) => {
          console.log(err);
      });
    })
    .then((order) => {
      console.log("Order Createed ");
      console.log(order);
    })
    .catch((err) => {
      console.log(err);
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
