const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');


const router = express.Router();

router.post("/add-service", isAuth, adminController.addService)
router.delete("/delete-service/:serviceID", isAuth,adminController.deleteService)
router.patch('/edit-service/:serviceID', isAuth, adminController.editService)

// /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);

// // /admin/products => GET
// router.get('/products', adminController.getProducts);

// // /admin/add-product => POST
// router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
