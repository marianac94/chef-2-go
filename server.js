const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
const Chef = require('./models/chef');
const Company    = require('./models/company');

require('./db/db');

const chefController    = require('./controllers/chef');
const companyController    = require('./controllers/company');
const newChefController = require('./controllers/newChef');
const newCompanyController = require('./controllers/newCompany');


app.use(session({
  secret: 'This is some random secret string',
  resave: false,
  saveUninitialized: false
}));


app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/chef', chefController);
app.use('/company', companyController)
app.use('/newChef', newChefController);
app.use('/newCompany', newCompanyController);


// show all chefs displayed in the index
app.get('/', async (req, res) => {

  try {
    res.render('index.ejs', {
    });

  } catch(err){
    res.send(err);
  }
});

app.get('/newCompany/logoutComp', (req, res) =>{
  req.session.destroy((err) =>{
    if(err){
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
});


app.listen(3000,() =>{
  console.log('the chef is ready to go');
})
