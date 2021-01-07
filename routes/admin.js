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

//router.post("/editProduct", adminController.exePutProduct);

router.get("/admin/edit-product/:productid", adminController.exeGetToUpdateProduct);

router.post("/updateProduct", adminController.exePutProduct);

router.post("/deleteProduct", adminController.exeDeleteProduct);

//module.exports = router;
exports.routes = router;