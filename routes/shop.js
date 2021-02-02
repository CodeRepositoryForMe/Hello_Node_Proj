const path = require("path");

const express = require("express");

const rootPath = require("../util/path");

const router = express.Router();

const adminRoute = require("./admin");

// Controllers
const productController = require("../controllers/products");

router.use("/catelog", productController.exeShowProductCatelog);

router.post("/cart", productController.exePostCart);

router.use("/cart", productController.exeGetCart);

router.post("/orders", productController.exePostOrders);

router.use("/orders", productController.exeOrders);

router.use("/checkout", productController.exeCheckout);

router.use("/index", productController.exeIndex);

router.use("/product/:productid", productController.exeGetProduct);

router.use("/deleteCartProduct/:productid", productController.exeDeleteCartProduct)

module.exports = router;
