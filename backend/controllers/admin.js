const { Types } = require("mongoose");
const Category = require("../models/category");
const Service = require("../models/service");

// const Product = require('../models/product');

exports.addService = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const city = req.body.city;
  const provider = req.userId;
  const category = req.body.category;

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
        provider: Types.ObjectId(provider),
        category: cat._id,
      });
      return newService.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Service Added"});
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editService = (req, res, next) => {
  const {
    body,
    params : {serviceID},
  } = req;
  Service.findOne({_id: serviceID})
  .then((service) => {
    if (!service) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }

    if (service.provider.toString() !== userId) {
      const error = new Error ("You do not have access to this servce")
      error.statusCode = 403; 
      throw error;
    }
    return Service.findByIdAndUpdate(serviceID,body,{ new: true });
  })
  .then(()=>{
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


    Service.findOne({_id : serviceID})
    .then((service) => {
      if (!service) {
        const error = new Error("Service not found");
        error.statusCode = 404;
        throw error;
      }

      if (service.provider.toString() !== userId) {
        const error = new Error ("You do not have access to this servce")
        error.statusCode = 403;
        throw error;
      }
      return Service.findByIdAndRemove(serviceID);
    })
    .then(()=>{
      res.status(200).json({ message: "Service Deleted" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
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
