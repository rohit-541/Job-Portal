export const auth = (req,res,next) => {
    console.log("Auth called");
    if(req.session.userEmail){
        next();
    }else{
        res.redirect('/login');
    }
}