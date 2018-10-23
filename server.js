const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
require('./db/db');


const chefController    = require('./controllers/chef');
const userController    = require('./controllers/user');
const newChefController = require('./controllers/newChef');


app.use(session({
  secret: 'This is some random secret string',
  resave: false,
  saveUninitialized: false
}));


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/chef', chefController);
app.use('/user', chefController)
app.use('/newChef', newChefController);


app.get('/', (req, res) => {
  res.render('index.ejs');
});



app.listen(3000,() =>{
  console.log('the chef is ready to go');
})
