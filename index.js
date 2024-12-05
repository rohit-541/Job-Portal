//Importing Module
import {express} from 'express'
import {expresslayout} from 'ejs-layout';

//Create server
const app = express();
app.use(express.static('/public'));
app.use(expresslayout);

//use ejs and ejs-layouts as middle-ware
app.set('view-engine','ejs');
app.set('views','./view');

//Set routes
app.get('/')


export default app;