// const Product = require('../models/product');
// const Order = require('../models/order');

const { BSONType } = require("mongodb");
const Category = require("../models/category");
const Order = require("../models/order");
const Service = require("../models/service");
const User = require("../models/user")

exports.getCategory = (req, res, next) => {
  Category.find()
    .then((category) => {
      res.status(200).json({ category: category });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProfile = async (req,res,next) => {
  const userId = req.userId
  try {
    const user = await User.findById(userId);
    const userProfile = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      username: user.username,
      address: user.address
    }
    res.status(200).json({user: userProfile});
  } catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err);
  }
}

exports.getServices = (req, res, next) => {
  Service.find()
    .populate("provider")
    .populate("category")
    .then((services) => {
      res.status(200).json({ message: "Successful", services: services });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getServicesByCategory = async (req,res,next) => {
  const categoryName = req.params.categoryName;
  try {
    const category = await Category.findOne({name: categoryName}).exec();
    console.log(category);
    const categoryId = category._id;
    const services = await Service.find({category : categoryId}).populate("provider").exec();
    res.status(200).json({services: services});
  }catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.getServiceByID = (req, res, next) => {
  const serviceID = req.params.serviceID;
  Service.findById(serviceID)
    .populate("provider")
    .populate("category")
    .then((service) => {
      res.status(200).json({ service: service });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getOrderById = (req, res, next) => {
  const user = req.userId;
  const id = BSONType.ObjectId(user);
  Order.find({ userId: user })
    .populate("service")
    .then((orders) => {
      res.status(200).json({ orders: orders });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getFavorites = async (req,res,next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate("favorite");
    const favoriteService = user.favorite;
    res.status(200).json({message: message, favoriteService: favoriteService})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.postFavorites = async  (req,res,next) => {
  const userId = req.userId;
  const serviceId = req.params.serviceID;

  try {
    const user = await User.findById(req.userId);
    const service = await Service.findById(serviceId);
    user.favorite.push(service);
    await user.save();
    res.status(201).json({message: "Service added to favorite"});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.deleteFavorite = async (req,res,next) => {
  const userId = req.userId;
  const serviceID = req.params.serviceID;
  try {
    const user = await User.findById(userId);
    user.favorite.pull(serviceID)
    await user.save();
    res.status(200).json({message: "Removed from favorite"})
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

// exports.orderService = (req,res,next) => {
//   const userId = req.userId;

//   try {
//     const user = await User
//   } catch (err) {

//   }
// }


// exports.getProducts = (req, res, next) => {
//   Product.find()
//     .then(products => {
//       console.log(products);
//       res.render('shop/product-list', {
//         prods: products,
//         pageTitle: 'All Products',
//         path: '/products'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then(product => {
//       res.render('shop/product-detail', {
//         product: product,
//         pageTitle: product.title,
//         path: '/products'
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.getIndex = (req, res, next) => {
//   Product.find()
//     .then(products => {
//       res.render('shop/index', {
//         prods: products,
//         pageTitle: 'Shop',
//         path: '/'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.getCart = (req, res, next) => {
//   req.user
//     .populate('cart.items.productId')
//     .execPopulate()
//     .then(user => {
//       const products = user.cart.items;
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: products
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId)
//     .then(product => {
//       return req.user.addToCart(product);
//     })
//     .then(result => {
//       console.log(result);
//       res.redirect('/cart');
//     });
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .removeFromCart(prodId)
//     .then(result => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };

// exports.postOrder = (req, res, next) => {
//   req.user
//     .populate('cart.items.productId')
//     .execPopulate()
//     .then(user => {
//       const products = user.cart.items.map(i => {
//         return { quantity: i.quantity, product: { ...i.productId._doc } };
//       });
//       const order = new Order({
//         user: {
//           name: req.user.name,
//           userId: req.user
//         },
//         products: products
//       });
//       return order.save();
//     })
//     .then(result => {
//       return req.user.clearCart();
//     })
//     .then(() => {
//       res.redirect('/orders');
//     })
//     .catch(err => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   Order.find({ 'user.userId': req.user._id })
//     .then(orders => {
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//       });
//     })
//     .catch(err => console.log(err));
// };
