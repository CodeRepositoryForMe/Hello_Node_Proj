const path = require("path");

const express = require("express");

const router = express.Router();

// Utility
const rootPath = require("../util/path");

// Conttrollers
const productController = require("../controllers/products");
const adminController = require("../controllers/admin");

const products = [];

router.get("/addproduct", productController.exeGetProducts);

router.post("/addproduct", adminController.exePostProducts);

router.get("/editProduct", adminController.exeGetToPutProduct);

router.post("/editProduct", adminController.exePutProduct);

//module.exports = router;
exports.routes = router;