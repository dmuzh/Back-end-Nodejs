const { default: mongoose } = require('mongoose');
const { Category } = require('../../models');

mongoose.connect('mongodb+srv://muzh28dev:Manh123456@cluster0.heat8ve.mongodb.net/database27-28');

try {
  const id = '64676725c33b355f0a22ab70';

  Category.findByIdAndDelete(id).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}