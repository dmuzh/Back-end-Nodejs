const { default: mongoose } = require('mongoose');
const { Category } = require('../../../models');

mongoose.connect('mongodb+srv://muzh28dev:Manh123456@cluster0.heat8ve.mongodb.net/database27-28');

try {
  const id = '64677b03051af16a275c47c1';

  const data = { name: 'Món khai vị' };

  Category.findByIdAndUpdate(id, data, {
    new: true,
  }).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}