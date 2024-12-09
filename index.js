//Import default pkgs
import express from 'express'
import ejsLayouts from 'express-ejs-layouts'
import path from 'path'
import session from 'express-session'
import cookieParser from 'cookie-parser'


//Import user modules
import {userControler} from '../Job-Portal/controllers/user.controler.js'
import validateRequest from './middleware/validation.middleware.js'
import validateRequest2 from './middleware/validation.login.js'
import {auth} from '../Job-Portal/middleware/auth.middleware.js'
import { setLastVisit } from './middleware/setlastVisit.js'
import {uploadFile} from '../Job-Portal/middleware/upload-file.js'

//create server
const app = express();

//Middlewares
app.use(express.static('public'));
app.use(session({
    secret:'secretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false},
}))
app.use(cookieParser());
app.use(setLastVisit);
app.set('layout','layoutD','layoutU','layoutR');
//set layout middleware
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
console.log();

//set the view engine
app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'views'));

//Make a userController
const UController = new userControler();


//all get requests

//No login required
app.get('/',UController.Home);
app.get('/login',UController.loginPage);
app.get('/register',UController.registerPage);

//After login
app.get('/addJob/:id',auth,UController.addJob);
app.get('/jobs/:id',auth,UController.RecruterJobs);
app.get('/gjobs/:id',auth,UController.allJobs);
app.get('/logout',UController.logout);
app.get('/updateJob/:id',auth,UController.getupdateJob);
app.get('/allJobs/:id',auth,UController.userHome);
app.get('/applyJob/:id',auth,UController.applyJob);
app.get('/applications/:id',auth,UController.getApplications);
app.get('/applicationJ/:id',auth,UController.getApplicationJ);

//All post requests(After Login)
app.post('/register',validateRequest,UController.registerUser);
app.post('/login',validateRequest2,UController.loginUser);
app.post('/addJob/:id',auth,UController.addNewJob);
app.post('/updateJob/:id',auth,UController.updateJob);
app.post('/deleteJob/:id',auth,UController.deleteJob);
app.post('/apply/:id',auth,uploadFile.single('resume'),UController.applyforJob);


//Export app to server
export {app}
