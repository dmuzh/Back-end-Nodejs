const { default: mongoose } = require('mongoose');
const { Supplier } = require('../../../models');

// mongoose.connect('mongodb://localhost:27017/batch-29-30-database');
mongoose.connect('mongodb+srv://muzh28dev:Manh123456@cluster0.heat8ve.mongodb.net/database27-28');

try {
  const data = {
    name: 'Nhà cung cấp đồ ăn',
    email: 'nccda@gmail.com',
    phoneNumber: '0386592529',
    address: '39 Yên Bái',
  };

  const newData = new Supplier(data);

  newData.save().then((result) => {
    console.log('««««« result »»»»»', result);
  });
} catch (err) {
  console.log('««««« err »»»»»', err);
}