const path = require('path');

const express = require('express');

const serviceController = require('../controllers/service');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get("/service", serviceController.getServices);
router.get("/category", serviceController.getCategory);
router.get("/orders", isAuth, serviceController.getCategory);

router.get("/service/:serviceID", serviceController.getServiceByID)
router.post("/service/:serviceID", serviceController.orderService)

// router.get('/', shopController.getIndex);

// router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.post('/create-order', shopController.postOrder);

// router.get('/orders', shopController.getOrders);

module.exports = router;
