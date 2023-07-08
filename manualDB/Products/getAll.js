const { default: mongoose } = require('mongoose');
const { Product } = require('../../../models');

mongoose.connect('mongodb+srv://muzh28dev:Manh123456@cluster0.heat8ve.mongodb.net/database27-28');

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