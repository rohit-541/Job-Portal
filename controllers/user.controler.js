import userModal from '../model/applicant.modal.js'
import jobModal from '../model/job.modal.js'


export class userControler{
    //Render home page
    Home(req,res,next){
        res.render('home.ejs',{login:false,error:null,msg:null});
    }   
    
    loginPage(req,res,next){
        res.render('login.ejs',{login:false,error:null,msg:null});
    }
    
    registerPage(req,res,next){
        res.render('register.ejs',{login:false,error:null,msg:null});
    }
    
    addJob(req,res){
        res.render('addjob.ejs',{login:true,error:null,msg:null});
    }
    registerUser(req,res){
        const data = req.body;
        const msg = userModal.addNew(data);
        if(msg == null){
            const err = ["User already exists.Please Login",]
            res.render('login',{login:false,error:err,msg:null});
        }else{
            const msg = ["Registered successfully.Please login with credentials on you Email"];
            res.render('login',{login:false,error:null,msg:msg})
        }
    }
    loginUser(req,res){
        const useremail = req.body.email;
        const userpassword = req.body.password;
        console.log(req.body);
        const authUser = userModal.authUser(useremail,userpassword);
        let jobs = jobModal.getAll();

        if(authUser){
            return res.render('userhome',{login:true,jobs:jobs,user:null});
        }   

        res.render('register',{login:false,error:["No user found.Please register first"],msg:null});
    }   
}