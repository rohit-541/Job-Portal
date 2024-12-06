import {
    body,
    validationResult,
  } from 'express-validator';
  
  const validateRequest2 = async (
    req,
    res,
    next
  ) => {
    console.log(req.body);
    // 1. Setup rules for validation.
    const rules = [
        body('email').notEmpty().withMessage('Email is required'),
        body('email').isEmail().withMessage('Provide a valid Email'),
        body('password').notEmpty().withMessage('Password Field can not be empty'),
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
      return res.render('login.ejs',{login:false,error:error,msg:null});
    }
    next();
  };
  
  export default validateRequest2;
  