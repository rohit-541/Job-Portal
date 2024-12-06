import {
    body,
    validationResult,
  } from 'express-validator';
  
  const validateRequest = async (
    req,
    res,
    next
  ) => {
    console.log(req.body);
    // 1. Setup rules for validation.
    const rules = [
      body('name')
        .notEmpty()
        .withMessage('Name is required'),body('email').notEmpty().withMessage('Email is neccessary'),
      body('email').isEmail().withMessage('Provide a valid Email'),
      body('password').custom((value,{req})=>{
        if(value != req.body.confirm){
            throw new Error('Password should match');
        }else{
            return true;
        }
      })
    ];
  
    // 2. run those rules.
    await Promise.all(
      rules.map((rule) => rule.run(req))
    );
  
    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);
    console.log(validationErrors);
    // 4. if errros, return the error message
    const error = validationErrors.array().map((err)=>err.msg); 
    if (!validationErrors.isEmpty()) {
      return res.render('register.ejs',{login:false,error:error});
    }
    next();
  };
  
  export default validateRequest;
  