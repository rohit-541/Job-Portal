//Import default pkgs
import express from 'express'
import ejsLayouts from 'express-ejs-layouts'
import path from 'path'


//Import user modules
import {userControler} from '../Job-Portal/controllers/user.controler.js'

//create server
const app = express();

//set layout middleware
app.use(express.static('public'));
app.use(ejsLayouts);
console.log();
//set the view engine
app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'views'));

const UController = new userControler();
app.get('/',UController.Home);
app.get('/login',UController.loginPage);
app.get('/register',UController.registerPage);
app.get('/addJob',UController.addJob);

export {app}
