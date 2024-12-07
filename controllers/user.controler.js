//Imported Important modals
import userModal from '../model/applicant.modal.js'
import jobModal from '../model/job.modal.js'
import recruterModal from '../model/recruiter.modal.js';

//User Controller //Both Recruter and Applicant
export class userControler{

    //All Rendering 
    //Render home page
    Home(req,res,next){
        res.render('home.ejs',{login:false,error:null,msg:null});
    }   
    
    //Render the home page
    loginPage(req,res,next){
        res.render('login.ejs',{login:false,error:null,msg:null});
    }
    
    //Render the register Page
    registerPage(req,res,next){
        res.render('register.ejs',{login:false,error:null,msg:null});
    }
    
    //Render addJob Page
    addJob(req,res){
        res.render('addjob.ejs',{login:true,error:null,msg:null});
    }

    //render the 

    //Register User on post request
    registerUser(req,res){
        //Get the data from form
        const data = req.body;  

        //if the registering user is applicant
        if(data.choice =='user'){
            const msg = userModal.addNew(data);
            if(msg == null){
                const err = ["User already exists.Please Login!",]
                res.render('login',{login:false,error:err,msg:null});
            }else{
                const msg = ["Registered successfully.Please login."];
                res.render('login',{login:false,error:null,msg:msg});
            }
        }else{
            const msg = recruterModal.addNew(data);
            if(msg == null){
                const err = ["User already exists.Please Login!",]
                res.render('login',{login:false,error:err,msg:null});
            }else{
                const msg = ["Registered successfully.Please login."];
                res.render('login',{login:false,error:null,msg:msg});
            }
        }
    }

    //Login user on post request
    loginUser(req,res){
        //Extract details from req
        const {email,password,choice} = req.body;
        const allJobs = jobModal.getAll();
        
        if(choice == 'user'){
            const user = userModal.authUser(email,password);
            
            if(user){
                req.session.userEmail = email;
                res.render('userHome',{login:true,user:user,msg:null,jobs:allJobs});
            }else{
                res.render('login',{login:false,error:['Invalid Credentials'],msg:null});
            }
        }else{
            const user = recruterModal.authUser(email,password);
            if(user){
                req.session.userEmail = email;
                res.render('recruterHome',{login:true,user:user,msg:null,error:null});
            }else{
                res.render('login',{login:false,error:['Invalid Credentials'],msg:null});
            }
        }

    }   




    //Logout the user
    logout(req,res,next){

        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login');
            }
        });
    }
}