const { default: mongoose } = require('mongoose');
const { Product } = require('../../../models');

mongoose.connect('mongodb://127.0.0.1:27017/database27-28');

try {
  Product
    .find()
    .populate('category')
    .populate('supplier')
    .lean({ virtuals: true })
    .then((result) => {
      console.log(result);
    });
} catch (err) {
  console.log(err);
}