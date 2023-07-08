const { default: mongoose } = require('mongoose');
const { Category } = require('../../models');

// mongoose.connect('mongodb://localhost:27017/batch-29-30-database');
mongoose.connect('mongodb+srv://muzh28dev:Manh123456@cluster0.heat8ve.mongodb.net/database27-28');

try {
  const category = {
    name: 'Món tráng khai vị',
    description: 'Mô tả món chính',
  };

  const newCategory = new Category(category);

  newCategory.save().then((result) => {
    console.log('««««« result »»»»»', result);
  });
} catch (err) {
  console.log('««««« err »»»»»', err);
}