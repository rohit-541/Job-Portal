//Import default pkgs
import express from 'express'
import ejsLayouts from 'express-ejs-layouts'
import path from 'path'


//Import user modules
import {userControler} from '../Job-Portal/controllers/user.controler.js'
import validateRequest from './middleware/validation.middleware.js'
import validateRequest2 from './middleware/validation.login.js'
//create server
const app = express();
app.use(express.static('public'));

//set layout middleware
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
console.log();
//set the view engine
app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'views'));

const UController = new userControler();
//Display Job listings
app.get('/',UController.Home);
app.get('/login',UController.loginPage);
app.get('/register',UController.registerPage);
app.get('/addJob',UController.addJob);

//Job Listing 
app.post('/register',validateRequest,UController.registerUser);
app.post('/login',validateRequest2,UController.loginUser);


export {app}
