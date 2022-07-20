const express = require("express");

const router = express.Router();

const { getOrders, createOrder } = require("../controllers/order-controller");

router.get("/orders", getOrders);

router.post("/orders", createOrder);


module.exports = router;