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

    //render the jobs
    RecruterJobs(req,res){
        const id = req.params.id;

        const user = recruterModal.getUserbyId(id);

        if(user != null){
            res.render('recruterJobs',{jobs:user.postedJob,login:true,error:null,msg:null});
        }
    }

    allJobs(req,res){
        const allJobs = jobModal.getAll();
        res.render('userhome',{jobs:allJobs,login:true,error:null,msg:null,user:null});
    }

    //render applications page
    application(req,res,next){
        const id = req.params.id;
        const user = recruterModal.getUserbyId(id);

        if(user){
            const applicant = {name:user.name,resume:user.linkedIn,email:user.email,}
        }
    }

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

    //Addnew Job
    addNewJob(req,res,next){    
        const skillArray = req.body.skills.split(',');
        jobModal.addJobs(req.body.category,req.body.desg,req.body.location,req.body.company,req.body.salary,req.body.deadline,skillArray,req.body.opening,Date.now().toLocaleString(),[]);
        
        return res.send("Job Submitted successfully");
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