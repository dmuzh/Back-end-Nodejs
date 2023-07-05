const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'ten danh muc k the bo trong'],
    unique: [true, 'tên danh mục k được trùng'],
    maxLength: 50
  },
  description: {
    type: String,
    maxLength: 50
  },
  img:{
        type: String,

  }
},
  {
    versionKey: false,
  },
);

const Category = model('Category', categorySchema);
module.exports = Category;