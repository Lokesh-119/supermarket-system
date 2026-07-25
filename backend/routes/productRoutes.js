const express = require("express");
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/productController");
const { archiveProduct, restoreProduct } = require("../controllers/productController");

router.post("/", addProduct);
router.get("/", getProducts);
router.put("/archive/:id", archiveProduct);
router.put("/restore/:id", restoreProduct);


module.exports = router;
