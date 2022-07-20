const express = require("express");

const router = express.Router();

const { getOrders, createOrder } = require("../controllers/api-order-controller");

router.get("/api/orders", getOrders);

router.post("/api/order", createOrder);


module.exports = router;