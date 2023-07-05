const { Product, Category, Supplier, Customer, Order } = require('../../models');
// const { getQueryDateTime } = require('../../utils/index');

module.exports = {
  question1: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $lte: 10 },
      };

      // console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1a: async (req, res, next) => {
    try {
      const { discount, type } = req.query;

      const conditionFind = {};

      if (discount) {
        switch (type) {
          case 'eq':
            conditionFind.discount = { $eq: discount };
            break;

          case 'lt':
            conditionFind.discount = { $lt: discount };
            break;

          case 'lte':
            conditionFind.discount = { $lte: discount };
            break;

          case 'gt':
            conditionFind.discount = { $gt: discount };
            break;

          case 'gte':
            conditionFind.discount = { $gte: discount };
            break;

          default:
            conditionFind.discount = { $eq: discount };
            break;
        }
      }

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1b: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $lte: 10 },
      };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Product.find(conditionFind)
        .populate('supplier')
        .populate('category')
        .lean();

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2a: async (req, res, next) => {
    try {
      const conditionFind = {
        stock: { $lte: 5 },
      };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Product.find(conditionFind).lean();

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2b: async (req, res, next) => {
    try {
      const conditionFind = {
        stock: { $lte: 5 },
      };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Product.find(conditionFind)
        .populate('supplier')
        .populate('category')
        .lean();

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3: async (req, res, next) => {
    try {
      // let discountedPrice = price * (100 - discount) / 100;
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90

      // discount = 40 ~~~ { discount: { $eq: 40 } }

      const m = { $multiply: ['$price', s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      // const { price } = req.query;

      const conditionFind = { $expr: { $lte: [d, parseFloat(1000)] } };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Product.find(conditionFind).lean() // convert data to object

      // const newResults = results.map((item) => {
      //   const dis = item.price * (100 - item.discount) / 100;
      //   return {
      //     ...item,
      //     dis,
      //   }
      // }).filter((item) => item.dis >= 40000);

      // console.log('««««« newResults »»»»»', newResults);

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3a: async (req, res, next) => {
    try {
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90

      const m = { $multiply: ['$price', s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const { price } = req.query;

      const conditionFind = { $expr: { $lte: [d, parseFloat(price)] } };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Product.find(conditionFind).lean() // convert data to object

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },
  question5: async (req, res) => {

    try {
      const { year } = req.query;

      const conditionFind = {
        $expr: {
          $eq: [{ $year: '$birthday' }, year],
        },
      };
      let results = await Customer
        .find(conditionFind)

      let total = await Customer.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  question7: async (req, res, next) => {
    try {
      const { status } = req.query;

      let results = await Order.find({ status })
        .populate({ path: 'customer', select: 'firstName lastName' })
        .populate('employee')
        .populate({
          path: 'orderDetails.product',
          select: { name: 1, stock: 1 },
        })
        .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  //cách khác c7
  question7a: async (req, res, next) => {
    try {
      const { status } = req.query;

      let results = await Order.aggregate()
        .match({ status })
        .lookup({
          from: 'customers',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer',
        })
        .unwind('customer')
        .lookup({
          from: 'employees',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'employee',
        })
        .unwind('employee')
        // thuộc tính k muôn thấy
        .project({
          customerId: 0,
          employeeId: 0,
        });
      // .lookup({
      //   from: 'products',
      //   localField: 'orderDetails.productId',
      //   foreignField: '_id',
      //   as: 'orderDetails.product',
      // })
      // .unwind('product')
      // .populate({ path: 'customer', select: 'firstName lastName' })
      // .populate('employee')
      // .populate({
      //   path: 'orderDetails.product',
      //   select: { name: 1 , stock: 1},
      // })
      // .select('-customerId -employeeId -orderDetails.productId')
      // .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question8a: async (req, res, next) => {
    try {
      let { status, date } = req.query;
      const findDate = date ? new Date(date) : new Date();

      const conditionFind = {
        $expr: {
          $and: [
            // { $eq: ['$status', status] },
            { status },
            { $eq: [{ $dayOfMonth: '$shippedDate' }, { $dayOfMonth: findDate }] },
            { $eq: [{ $month: '$shippedDate' }, { $month: findDate }] },
            { $eq: [{ $year: '$shippedDate' }, { $year: findDate }] },

          ],
        },
      };


      let results = await Order.find(conditionFind)
        .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  question8b: async (req, res, next) => {
    try {
      let { status, fromDate, toDate } = req.query;

      fromDate = new Date(fromDate);
      fromDate.setHours(0, 0, 0, 0);

      const tmpToDate = new Date(toDate);
      tmpToDate.setHours(0, 0, 0, 0);
      toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));

      const compareStatus = { $eq: ['$status', status] };
      const compareFromDate = { $gte: ['$shippedDate', fromDate] };
      const compareToDate = { $lt: ['$shippedDate', toDate] };

      const conditionFind = {
        $expr: { $and: [compareStatus, compareFromDate, compareToDate] },
      };

      let results = await Order.find(conditionFind)
        .populate('orderDetails.product')
        .populate('customer')
        .populate('employee')
        .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question9: async (req, res, next) => {
    try {
      const { status } = req.query;

      let results = await Order.find({ status })
        .populate({ path: 'customer', select: 'firstName lastName' })
        .populate('employee')
        .populate({
          path: 'orderDetails.product',
          select: { name: 1, stock: 1 },
        })
        .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  question10: async (req, res, next) => {
    try {
      let { status, date } = req.query;
      const findDate = date ? new Date(date) : new Date();

      const conditionFind = {
        $expr: {
          $and: [
            // { $eq: ['$status', status] },
            { status },
            { $eq: [{ $dayOfMonth: '$shippedDate' }, { $dayOfMonth: findDate }] },
            { $eq: [{ $month: '$shippedDate' }, { $month: findDate }] },
            { $eq: [{ $year: '$shippedDate' }, { $year: findDate }] },

          ],
        },
      };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Order.find(conditionFind)
        .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question11: async (req, res, next) => {
    try {
      const { paymentType } = req.query;

      let results = await Order.find({ paymentType })
        .populate({ path: 'customer', select: 'firstName lastName' })
        .populate('employee')
        .populate({
          path: 'orderDetails.product',
          select: { name: 1, stock: 1 },
        })
        .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.paymentType(500).json({ code: 500, error: err });
    }
  },
  question12: async (req, res, next) => {
    try {
      const { paymentType } = req.query;

      let results = await Order.find({ paymentType })
        .populate({ path: 'customer', select: 'firstName lastName' })
        .populate('employee')
        .populate({
          path: 'orderDetails.product',
          select: { name: 1, stock: 1 },
        })
        .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.paymentType(500).json({ code: 500, error: err });
    }
  },
  question13: async (req, res, next) => {
    try {
      const { address } = req.query;

      let results = await Order.aggregate()

        .lookup({
          from: 'customers',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer',
        })
        .unwind('customer')
        .match({ 'customer.address': { $regex: new RegExp(`${address}`), $options: 'i' } })



      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  question18: async (req, res, next) => {
    try {

      let results = await Category.aggregate()

        .lookup({
          from: 'products',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'products',
        })
        .unwind({
          path: '$products',
          preserveNullAndEmptyArrays: true,
        })
        .group({
          _id: '$_id',
          name: { $first: '$name' },
          description: { $first: '$description ' },
          totalProduct: {
            $sum: '$products.stock'
          },
        })
        .sort({
          totalProduct: -1,
          name: 1
        })


      let total = await Category.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  question19: async (req, res, next) => {
    try {

      let results = await Supplier.aggregate()

        .lookup({
          from: 'products',
          localField: '_id',
          foreignField: 'supplierId',
          as: 'products',
        })
        .unwind({
          path: '$products',
          preserveNullAndEmptyArrays: true,
        })
        .group({
          _id: '$_id',
          name: { $first: '$name' },
          description: { $first: '$description ' },
          totalProduct: {
            $sum: '$products.stock'
          },
        })
        .sort({
          totalProduct: -1,
          name: 1
        })


      let total = await Supplier.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  question20: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match({
          ...conditionFind,
          status: { $in: ['COMPLETE'] },
        })
        .unwind('orderDetails')
        .lookup({
          from: 'products',
          localField: 'orderDetails.productId',
          foreignField: '_id',
          as: 'orderDetails.product',
        })
        .unwind('orderDetails.product')
        .group({
          _id: '$orderDetails.productId',
          name: { $first: '$orderDetails.product.name' },
          price: { $first: '$orderDetails.product.price' },
          discount: { $first: '$orderDetails.product.discount' },
          stock: { $first: '$orderDetails.product.stock' },
          count: { $sum: 1 },
        });

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  question24: async (req, res, next) => {
    try {
      // let { fromDate, toDate } = req.query;
      // const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        // .match(conditionFind)
        .unwind({
          path: '$orderDetails',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          total: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$orderDetails.price',
                    { $subtract: [100, '$orderDetails.discount'] },
                    '$orderDetails.quantity',
                  ],
                },
                100,
              ],
            },
          },
        })
        .group({
          _id: '$employeeId',
          total: { $sum: '$total' },
        })
        .lookup({
          from: 'employees',
          localField: '_id',
          foreignField: '_id',
          as: 'employee',
        })
        .unwind('employee')
        .project({
          totalPrice: '$total',
          firstName: '$employee.firstName',
          lastName: '$employee.lastName',
          phoneNumber: '$employee.phoneNumber',
          address: '$employee.address',
          email: '$employee.email ',
        })

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question25: async (req, res, next) => {
    try {
      let results = await Product.aggregate()
        .lookup({
          from: 'orders',
          localField: '_id',
          foreignField: 'orderDetails.productId',
          as: 'orders',
        })
        .match({
          orders: { $size: 0 },
        })
        .project({
          id: 1,
          name: 1,
          price: 1,
          stock: 1,
        })

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  question27: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match(conditionFind)
        .unwind({
          path: '$orderDetails',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          total: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$orderDetails.price',
                    { $subtract: [100, '$orderDetails.discount'] },
                    '$orderDetails.quantity',
                  ],
                },
                100,
              ],
            },
          },
        })
        .group({
          _id: '$employeeId',
          total: { $sum: '$total' },
        })
        .lookup({
          from: 'employees',
          localField: '_id',
          foreignField: '_id',
          as: 'employee',
        })
        .unwind('employee')
        .project({
          totalPrice: '$total',
          firstName: '$employee.firstName',
          lastName: '$employee.lastName',
          phoneNumber: '$employee.phoneNumber',
          address: '$employee.address',
          email: '$employee.email ',
        })

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  hotSale: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $gt: 10 },

      };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Product.find(conditionFind).sort({ discount: -1 }).limit(5);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },
  hotSaleFull: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $gt: 10 },

      };


      let results = await Product.find(conditionFind).sort({ discount: -1 });
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  selling: async (req, res, next) => {
    try {
      let results = await Order.aggregate()
        .match({
          status: { $in: ['COMPLETED'] },
        })
        .unwind('orderDetails')
        .lookup({
          from: 'products',
          localField: 'orderDetails.productId',
          foreignField: '_id',
          as: 'orderDetail.product'
        })
        .unwind('orderDetails.product')
        .group({
          _id: 'orderDetails.productId',
          name: { $first: '$orderDetails.product.name' },
          price: { $first: '$orderDetails.product.price' },
          discount: { $first: '$orderDetails.product.discount' },
          stock: { $first: '$orderDetails.product.stock' },
          totalProductSell: {
            $sum: '$orderDetails.quantity',
          },
          count: { $sum: 1 },
        })
        .sort({
          totalProductSell: -1,

        })
        // .limit(10)
      let total = await Order.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });


    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }


  },

  spRandom: async (req, res, next) => {
    try {
      results = await Product.find().limit(4);
      let total = await Product.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
  categorelimit: async (req, res, next) => {
    try {
      
      let results = await Category.find().limit(4);
      let total = await Category.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },





}

