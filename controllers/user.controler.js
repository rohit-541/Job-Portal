export class userControler{
    //Render home page
    LoginHome(req,res,next){
        res.render('home.ejs',{login:false});
    }   

    static loginPage(req,res,next){
        res.render('login.ejs',{login:false});
    }
    
}