const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
const Chef = require('./models/chef');
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


// show all chefs displayed in the index
app.get('/', async (req, res) => {
  console.log('h1');
  try {
    const foundChefs = await Chef.find({});
    res.render('index.ejs', {
      chef: foundChefs
    });
  } catch(err){
    res.send(err);
  }
});


app.listen(3000,() =>{
  console.log('the chef is ready to go');
})
