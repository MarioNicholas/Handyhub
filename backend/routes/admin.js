const path = require('path');

const express = require('express');
const expressValidator = require("express-validator");

const adminController = require('../controllers/admin');
const fileUpload = require("../middleware/file-upload")
const isAuth = require('../middleware/is-auth');


const router = express.Router();

router.post("/add-service", isAuth, [
  expressValidator.body("name").trim().notEmpty(),
  expressValidator.body("price").trim().notEmpty(),
  expressValidator.body("description").trim().notEmpty(),
  expressValidator.body("city").trim().notEmpty(),
  expressValidator.body("specialty").trim().notEmpty(),
],fileUpload.array("images",4),adminController.addService)

router.delete("/delete-service/:serviceID", isAuth,adminController.deleteService)
router.patch("/edit-service/:serviceID", [
  expressValidator.body("name").trim().notEmpty(),
  expressValidator.body("price").trim().notEmpty(),
  expressValidator.body("description").trim().notEmpty(),
  expressValidator.body("specialty").trim().notEmpty(),
],isAuth, adminController.editService)

router.get("/service", isAuth, adminController.getService)

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
