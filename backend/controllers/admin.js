const { Types } = require("mongoose");
const Category = require("../models/category");
const Service = require("../models/service");
const Review = require("../models/review")
const Order = require("../models/order")
const fs = require("fs");
const path = require("path");

// const Product = require('../models/product');

exports.addService = (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const name = req.body.name;
  const price = parseFloat(req.body.price);
  const description = req.body.description;
  const city = req.body.city;
  const userId = req.userId;
  const category = req.body.category;
  const specialty = req.body.specialty;
  const jobs = 0;
  const rating = 0.0;
  const images = req.files.map((file) => file.filename);

  Category.findOne({ name: category })
    .then((cat) => {
      if (!cat) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
      }
      const newService = new Service({
        name: name,
        price: price,
        description: description,
        city: city,
        provider: userId,
        category: cat._id,
        specialty: specialty,
        jobs: jobs,
        rating: rating,
        images: images,
      });
      return newService.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Service Added" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// "message": "Service validation failed: provider: Path `provider` is required."

exports.editService = (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const name = req.body.name;
  const price = parseFloat(req.body.price);
  const description = req.body.description;
  const specialty = req.body.specialty;
  const serviceID = req.params.serviceID

  const editedService = {
    name: name,
    price: price,
    description: description,
    specialty: specialty,
  }

  Service.findById(serviceID)
    .then((service) => {
      if (!service) {
        const error = new Error("Service not found");
        error.statusCode = 404;
        throw error;
      }

      if (service.provider.toString() !== req.userId) {
        const error = new Error("You do not have access to this service");
        error.statusCode = 403;
        throw error;
      }
      return Service.findByIdAndUpdate(serviceID, editedService, { new: true });
    })
    .then(() => {
      res.status(200).json({ message: "Service Updated" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteService = (req, res, next) => {
  const serviceID = req.params.serviceID;
  const userId = req.userId;

  Service.findOne({ _id: serviceID })
    .then((service) => {
      if (!service) {
        const error = new Error('Service not found');
        error.statusCode = 404;
        throw error;
      }

      if (service.provider.toString() !== userId) {
        const error = new Error('You do not have access to this service');
        error.statusCode = 403;
        throw error;
      }

      // Delete all images associated with the service
      service.images.forEach((imagePath) => {
        const fullImagePath = path.join(__dirname, 'images', imagePath);
        fs.unlink(fullImagePath, (err) => {
          if (err) {
            console.error('Failed to delete image:', err);
          }
        });
      });

      // Delete the service
      return Service.findByIdAndRemove(serviceID);
    })
    .then(() => {
      // Delete all reviews associated with the service
      return Review.deleteMany({ serviceId: serviceID });
    })
    .then(() => {
      // Delete all orders associated with the service
      return Order.deleteMany({ serviceId: serviceID });
    })
    .then(() => {
      res.status(200).json({ message: 'Service Deleted' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getService = async (req, res, next) => {
  const userId = req.userId;
  try {
    const service = await Service.find({ provider: userId })
      .populate("provider")
      .populate("category")
      .exec();

    if (!service) {
      res.status(200).json({ service: [], message: "No Services" });
    }

    const modifiedService = service.map((service) => ({
      ...service._doc,
      images: service.images.length > 0 ? [service.images[0]] : [],
    }));
    res.status(200).json({ message: "Successful", services: modifiedService });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// exports.getAddProduct = (req, res, next) => {
//   res.render('admin/edit-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     editing: false
//   });
// };

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   const product = new Product({
//     title: title,
//     price: price,
//     description: description,
//     imageUrl: imageUrl,
//     userId: req.user
//   });
//   product
//     .save()
//     .then(result => {
//       // console.log(result);
//       console.log('Created Product');
//       res.redirect('/admin/products');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then(product => {
//       if (!product) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: product
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;

//   Product.findById(prodId)
//     .then(product => {
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.description = updatedDesc;
//       product.imageUrl = updatedImageUrl;
//       return product.save();
//     })
//     .then(result => {
//       console.log('UPDATED PRODUCT!');
//       res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));
// };

// exports.getProducts = (req, res, next) => {
//   Product.find()
//     // .select('title price -_id')
//     // .populate('userId', 'name')
//     .then(products => {
//       console.log(products);
//       res.render('admin/products', {
//         prods: products,
//         pageTitle: 'Admin Products',
//         path: '/admin/products'
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByIdAndRemove(prodId)
//     .then(() => {
//       console.log('DESTROYED PRODUCT');
//       res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));
// };
