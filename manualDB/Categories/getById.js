const { default: mongoose } = require('mongoose');
const { Category } = require('../../models');

mongoose.connect('mongodb+srv://muzh28dev:Manh123456@cluster0.heat8ve.mongodb.net/database27-28');

try {
  const taotenphuong = '64675f4da5fb6653ed8bb38b';
  
  Category.findById(taotenphuong).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
