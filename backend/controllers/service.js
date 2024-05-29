// const Product = require('../models/product');
// const Order = require('../models/order');

const { BSONType } = require("mongodb");
const Category = require("../models/category");
const Order = require("../models/order");
const Service = require("../models/service");
const User = require("../models/user");
const Review = require("../models/review");

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

exports.getProfile = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const userProfile = {
      id: user._id.toString(),
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      username: user.username,
      address: user.address,
      image: user.image
    };
    res.status(200).json({ user: userProfile });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getServices = (req, res, next) => {
  Service.find()
    .populate("provider")
    .populate("category")
    .then((services) => {
      const modifiedService = services.map((service) => ({
        ...service._doc,
        images: service.images.length > 0 ? [service.images[0]] : []
      }));
      res.status(200).json({ message: "Successful", services: modifiedService });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getServicesByCategory = async (req, res, next) => {
  const categoryName = req.params.categoryName;
  try {
    const category = await Category.findOne({ name: categoryName }).exec();
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
    const categoryId = category._id;
    const services = await Service.find({ category: categoryId })
      .populate("provider")
      .populate("category")
      .exec();
    const modifiedService = services.map((service) => ({
        ...service._doc,
        images: service.images.length > 0 ? [service.images[0]] : []
      }));
    res.status(200).json({ message: "Successful", services: modifiedService });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

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
  // const id = BSONType.ObjectId(user);
  Order.find({ userId: user })
    .populate({
      path: "serviceId",
      populate: {
        path: "provider",
      },
    })
    .exec()
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

exports.getFavorites = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate({
      path: 'favorite',
      populate: {
        path: 'provider',
      }
    }).exec();
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({ message: "Success", favorites: user.favorite });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postFavorites = async (req, res, next) => {
  const userId = req.userId;
  const serviceId = req.params.serviceID;

  try {
    const user = await User.findById(req.userId);
    const service = await Service.findById(serviceId);
    user.favorite.push(service);
    await user.save();
    res.status(201).json({ message: "Service added to favorite" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteFavorite = async (req, res, next) => {
  const userId = req.userId;
  const serviceID = req.params.serviceID;
  try {
    const user = await User.findById(userId);
    user.favorite.pull(serviceID);
    await user.save();
    res.status(200).json({ message: "Removed from favorite" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.orderService = (req, res, next) => {
  const userId = req.userId;
  const serviceID = req.body.serviceID;
  const amount = req.body.amount;
  const transactionDate = new Date();
  const serviceDate = req.body.serviceDate;
  const paymentMethod = req.body.paymentMethod;
  const address = req.body.address;
  const status = "Scheduled";
  const order = new Order({
    userId: userId,
    serviceId: serviceID,
    amount: amount,
    transactionDate: transactionDate,
    serviceDate: new Date(serviceDate),
    paymentMethod: paymentMethod,
    address: address,
    status: status,
  });
  return order
    .save()
    .then((result) => {
      return Service.findById(serviceID);
    })
    .then((service) => {
      service.jobs += 1;
      return service.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Order Success" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.finishOrder = (req, rest, next) => {
  const userId = req.userId;
  const orderId = req.body.orderId;
  const status = "Completed";
  Order.findOne({ _id: orderId, userId: userId })
    .then((order) => {
      if (!order) {
        const error = new Error("Order not Found");
        error.statusCode = 404;
        throw error;
      }

      if (order.userId.toString() !== userId) {
        const error = new Error("You do not have access to this order");
        error.statusCode = 403;
        throw error;
      }

      return Order.findOneAndUpdate(orderId, {status:status}, { new: true });
    })
    .then(() => {
      res.status(200).json({ message: "Order Completed" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addReview = async (req,res,next) => {
  const userId = req.userId;
  const serviceId = req.params.serviceID;
  const rating = req.body.rating;
  const review = req.body.review;
  try {
    const newReview = new Review({
      userId: userId,
      serviceId: serviceId,
      rating: rating,
      review: review
    })
    await newReview.save();
    const reviews = await Review.find({ serviceId: serviceId });
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = (totalRating/reviews.length).toFixed(1);
    await Service.findByIdAndUpdate(serviceId, { rating: averageRating });
    res.status(201).json({message: "Review added"}) 
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getReview = async (req,res,next) => {
  const serviceID = req.params.serviceID;
  try {
    const reviewDoc = await Review.find({serviceId: serviceID}).populate("userId").exec();
    const reviewData = reviewDoc.map((doc) => {return {
      id: doc._id.toString(),
      userId: doc.userId._id.toString(),
      name: doc.userId.name,
      review: doc.review,
      rating: doc.rating
    }});
    res.status(200).json({review: reviewData, message: "Fetched"})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.deleteReview = (req,res,next) => {
  const reviewID = req.params.reviewID;
  const userId = req.userId
  let serviceId;

  Review.findById(reviewID)
  .then((review) => {
    if (!review) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      throw error;
    }

    if (review.userId.toString() !== userId) {
      const error = new Error ("You do not have access to this review")
        error.statusCode = 403;
        throw error;
    }
    serviceId = review.serviceId
    return Review.findByIdAndDelete(reviewID);
  })
  .then((result) => {
    return Review.find({serviceId:serviceId})
  })
  .then((remaining) => {
    let averageRating = 0;
    if (remaining.length > 0) {
        const totalRatings = remaining.reduce((acc, review) => acc + review.rating, 0);
        averageRating = (totalRatings / remaining.length).toFixed(1); // Round to 1 decimal place
        averageRating = parseFloat(averageRating); 
      }
      return Service.findByIdAndUpdate(serviceId, { rating: averageRating });
  })
  .then((result) => {
    res.status(201).json({message: "Review Deleted"})
  })
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

// exports.editService = (req, res, next) => {
//   const {
//     body,
//     params : {},
//   } = req;
//   Service.findOne({_id: serviceID})
//   .then((service) => {
//     if (!service) {
//       const error = new Error("Service not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     if (service.provider.toString() !== userId) {
//       const error = new Error ("You do not have access to this servce")
//       error.statusCode = 403;
//       throw error;
//     }
//     return Service.findByIdAndUpdate(serviceID,body,{ new: true });
//   })
//   .then(()=>{
//     res.status(200).json({ message: "Service Updated" });
//   })
//   .catch((err) => {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   });
// };

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

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

// exports.getOrderById = (req, res, next) => {
//   const user = req.userId;
//   const id = BSONType.ObjectId(user);
//   Order.find({ userId: id })
//     .populate("service").populate("service.provider").exec()
//     .then((orders) => {
//       res.status(200).json({ orders: orders });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
