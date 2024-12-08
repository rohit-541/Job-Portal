//Imported Important modals
import userModal from '../model/applicant.modal.js'
import jobModel from '../model/job.modal.js';
import jobModal from '../model/job.modal.js'
import recruterModal from '../model/recruiter.modal.js';

//User Controller //Both Recruter and Applicant
export class userControler{

    //All Rendering 
    //Render home page
    Home(req,res,next){
        res.render('home.ejs',{login:false,error:null,msg:null,user:null,layout:'layoutD'});
    }   
    //render update job page
    getupdateJob(req,res,next){
        const id = req.params.id;
        const job = jobModal.getByID(id);

        res.render('update-job',{error:null,msg:null,login:true,user:job.user,layout:'layoutR',job:job});
    }


    //Render the home page
    loginPage(req,res,next){
        res.render('login.ejs',{login:false,error:null,msg:null,user:null,layout:'layoutD'});
    }
    
    //Render the register Page
    registerPage(req,res,next){
        res.render('register.ejs',{login:false,error:null,msg:null,user:null,layout:'layoutD'});
    }
    
    //Render addJob Page
    addJob(req,res){
        const id = req.params.id;

        const user = recruterModal.getUserbyId(id);

        res.render('addjob.ejs',{login:true,error:null,msg:null,user:user,layout:'layoutR'});
    }

    //render the jobs
    RecruterJobs(req,res){
        const id = req.params.id;

        const user = recruterModal.getUserbyId(id);

        if(user != null){
            res.render('recruterJobs',{jobs:user.postedJob,login:true,error:null,msg:null,user:user,layout:'layoutR'});
        }
    }

    allJobs(req,res){
        const id = req.params.id;
        const user = recruterModal.getUserbyId(id);

        const allJobs = jobModal.getAll();
    
        
        res.render('userhome',{jobs:allJobs,login:true,error:null,msg:null,layout:'layoutR',user:user});
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
                res.render('login',{login:false,error:err,msg:null,user:null});
            }else{
                const msg = ["Registered successfully.Please login."];
                res.render('login',{login:false,error:null,msg:msg,user:null});
            }
        }else{
            const msg = recruterModal.addNew(data);
            if(msg == null){
                const err = ["User already exists.Please Login!",]
                res.render('login',{login:false,error:err,msg:null,user:null});
            }else{
                const msg = ["Registered successfully.Please login."];
                res.render('login',{login:false,error:null,msg:msg,user:null});
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
                res.render('login',{login:false,error:['Invalid Credentials'],msg:null,user:null});
            }
        }else{
            const user = recruterModal.authUser(email,password);
            if(user){
                req.session.userEmail = email;
                res.render('userHome',{login:true,user:user,msg:null,error:null,jobs:allJobs,layout:'layoutR'});
            }else{
                res.render('login',{login:false,error:['Invalid Credentials'],msg:null,user:null});
            }
        }

    }   

    //Addnew Job
    addNewJob(req,res,next){
        
        const id = req.params.id;
        
        const user = recruterModal.getUserbyId(id);

        //Get current posted Date and skill array
        const postedDate = new Date().toLocaleDateString();
        const skillArray = req.body.skills.split(',');

        //create a job
        const newJob = new jobModal(req.body.category,req.body.desg,req.body.location,req.body.company,req.body.salary,req.body.deadline,skillArray,req.body.opening,postedDate,[],user);
        
        jobModal.addJobs(newJob);
        user.postedJob.push(newJob);
        user.notifications.push("Successfully added new Job");
        const jobs = user.postedJob;
        return res.render('recruterJobs',{login:false,jobs:jobs,error:null,msg:null,user:user,layout:'layoutR'});
    }

    //Update Job
    updateJob(req,res){
        const id = req.params.id;
        const job = jobModal.getByID(id);
        const {category,desg,location,company,salary,opening,deadline} = req.body;
        jobModal.updateJob(id,category,desg,location,company,salary,deadline,opening);
        const jobs = jobModal.getAll();
    
        res.render('userHome',{login:true,error:false,user:job.user,jobs:jobs,layout:'layoutR'});
    }

    //delete job
    deleteJob(req,res,next){
        const id = req.params.id;
        console.log("Hello i am called on id:",id);
        const result = jobModal.removeJob(id);
        const jobs = jobModal.getAll();
        if(result){
            res.render('recruterJobs',{layout:'layoutR',user:result,jobs:jobs,error:null,msg:null});
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