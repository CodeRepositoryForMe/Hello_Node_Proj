const path = require("path");

const express = require("express");

const rootPath = require("../util/path");

const router = express.Router();

const adminRoute = require("./admin");

// Controllers
const productController = require("../controllers/products");
router.use("/catelog", productController.exeShowProductCatelog);

module.exports = router;
