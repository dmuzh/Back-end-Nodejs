const { default: mongoose } = require('mongoose');
const { Category } = require('../../models');

mongoose.connect('mongodb://127.0.0.1:27017/database27-28');

try {
  const taotenphuong = '64675f4da5fb6653ed8bb38b';
  
  Category.findById(taotenphuong).then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
