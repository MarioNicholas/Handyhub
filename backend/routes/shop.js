const path = require('path');

const express = require('express');

const serviceController = require('../controllers/service');
const isAuth = require('../middleware/is-auth');
const expressValidator = require("express-validator");


const router = express.Router();

router.get("/service", serviceController.getServices);
router.get("/category", serviceController.getCategory);
router.get("/orders", isAuth, serviceController.getOrderById);
router.get("/profile", isAuth, serviceController.getProfile);

router.get("/service/:serviceID", serviceController.getServiceByID);
router.get("/services/:categoryName", serviceController.getServicesByCategory);
router.post("/service/order", isAuth, serviceController.orderService);
router.patch("/service/finish-order/:orderId",isAuth,serviceController.finishOrder);

router.get("/favorite", isAuth, serviceController.getFavorites);
router.post("/favorite/:serviceID", isAuth, serviceController.postFavorites);
router.delete("/favorite/:serviceID", isAuth, serviceController.deleteFavorite);

router.post("/review/:serviceID", isAuth, [
  expressValidator.body("rating").trim().notEmpty(),
  expressValidator.body("review").trim().notEmpty(),
], serviceController.addReview);
router.get("/review/:serviceID", serviceController.getReview);
router.delete("/review/:reviewID", isAuth, serviceController.deleteReview)


// router.get('/', shopController.getIndex);

// router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.post('/create-order', shopController.postOrder);

// router.get('/orders', serviceController.getOrders);

module.exports = router;
