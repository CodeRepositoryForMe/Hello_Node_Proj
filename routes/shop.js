const path = require("path");

const express = require("express");

const rootPath = require("../util/path");

const router = express.Router();

const adminRoute = require("./admin");

// Controllers
const productController = require("../controllers/products");
router.use("/catelog", productController.exeShowProductCatelog);
router.use("/cart", productController.exeCart);
router.use("/order", productController.exeOrder);
router.use("/checkout", productController.exeCheckout);
router.use("/index", productController.exeIndex);
module.exports = router;
