export class userControler{
    //Render home page
    Home(req,res,next){
        res.render('home.ejs',{login:false});
    }   

    loginPage(req,res,next){
        res.render('login.ejs',{login:false});
    }

    registerPage(req,res,next){
        res.render('register.ejs',{login:false});
    }
    
    addJob(req,res){
        res.render('addjob.ejs',{login:true});
    }
    registerUser(req,res){
        //To-Do
    }
    loginUser(req,res){
        //TO-do
    }
}