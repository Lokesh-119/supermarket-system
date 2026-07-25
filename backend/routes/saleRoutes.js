const express = require("express");
const router = express.Router();

const {
  addSale,
  getSalesAnalytics,
  getRecentSales,
  getSalesByDateRange,
  getDemandPrediction
} = require("../controllers/saleController");

router.post("/", addSale);
router.get("/analytics", getSalesAnalytics);
router.get("/recent", getRecentSales);
router.get("/range", getSalesByDateRange);
router.get("/predict-demand", getDemandPrediction);

module.exports = router;
