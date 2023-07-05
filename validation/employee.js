const { schema } = require('../models/Product')

const ObjectId  =require('mongodb').ObjectId

const validateSchema =(schema)=>async( rep,res,next)=>{
    try{
        await schema.validate({
            body:rep.body,
            query: rep.query,
            parmas:req.parmas
        },{abortEarly:false})
        return next()
    }catch (err){
        return res.status(401).json({
            errors :err?.errors,
            typeof:err.name,
            message:'xác thực dữ liệu thất bại'
        })
    }
}
const loginSchema = yup.object({
    body: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(3).max(31).required(),
    }),
    params: yup.object({}),
  });
  
  const categorySchema = yup.object().shape({
    params: yup.object({
      id: yup.string().test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
        return ObjectId.isValid(value);
      }),
    }),
  });
  
  module.exports = {
    validateSchema,
    loginSchema,
    categorySchema,
  };