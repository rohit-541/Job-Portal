//Import default pkgs
import express from 'express'
import ejsLayouts from 'express-ejs-layouts'
import path from 'path'


//Import user modules
import {userControler} from '../Job-Portal/controllers/user.controler.js'

//create server
const app = express();

//set layout middleware
app.use(ejsLayouts);
app.use(express.static('public'));

//set the view engine
app.set('view-engine','ejs');
app.set('views','/views/');

const UController = new userControler();
app.get('/',UController.LoginHome);

export {app}
