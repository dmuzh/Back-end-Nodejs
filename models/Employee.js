const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs');


const employeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        },
        message: `{VALUE} is not a valid email!`,
        // message: (props) => `{props.value} is not a valid email!`,
      },
      required: [true, 'email is required'],
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (value) {
          const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
          return phoneRegex.test(value);
        },
        message: `{VALUE} is not a valid phone!`,
        // message: (props) => `{props.value} is not a valid email!`,
      },
    },
    // password: { type: String, required: true },
    address: { type: String, required: true },
    birthday: { type: Date },
    password: {
      type: String,
      minLength: [6, 'Mật khẩu phải có tối thiểu 6 kí tự'],
      maxLength: [12, 'Mật khẩu không được vượt quá 12 ký tự'],
      required: [true, 'Mật khẩu không được bỏ trống'],
    },
  },
  {
    versionKey: false,
  },
);

// Virtuals
employeeSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

employeeSchema.pre('save', async function (next) {
  try {
    console.log('«««««  »»»»»',this.password );
    // generate salt key
    const salt = await bcrypt.genSalt(8); // 8 ký tự
    // generate password = salt key + hash key
    const hashPass = await bcrypt.hash(this.password, salt);
    // override password
    this.password = hashPass;
    console.log('«««««  »»»»»',this.password );

    next();
  } catch (err) {
    next(err);
  }
});

employeeSchema.methods.isValidPass = async function(pass) {
  try {
    return await bcrypt.compare(pass, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

// employeeSchema.pre('save', function a(next) {
//   const user = this;

//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, (hashErr, hash) => {
//       if (hashErr) return next(hashErr);

//       user.password = hash;
//       next();
//     });
//   });
// });

const Employee = model('Employee', employeeSchema);
module.exports = Employee;