const path = require("path");

const express = require("express");

const router = express.Router();

// Utility
const rootPath = require("../util/path");

// Conttrollers
const productController = require("../controllers/products");


const products = [];

router.post("/product", productController.exePostProducts);

router.get("/product", productController.exeGetProducts);

//module.exports = router;
exports.routes = router;