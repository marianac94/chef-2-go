const express  = require('express');
const router   = express.Router();
const Company    = require('../models/company');
const bcrypt = require('bcrypt');

const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');



router.get('/loginComp',(req, res) =>{
  const message = req.session.message;
  delete req.session.message;
  res.render('newCompany/loginComp.ejs', {
    message: message
  });
});


router.post('/registerComp', async (req, res) => {
  try {
    // going to store our password in variable
    const password      = req.body.password;
    // create the hash for password
    const passwordHash  = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log(passwordHash);

    // Create an object to put into our database into the User Model
    const companyEntry     = {};
    companyEntry.companyName      = req.body.companyName;
    companyEntry.username  = req.body.username;
    companyEntry.password  = passwordHash;

    const company = await Company.create(companyEntry);
    console.log(company);

    // initializing the session
    // req.session.username = req.body.username;
    req.session.logged  = true;
    req.session.message = '';
    req.session.companyId = Company._id;
    // *************** work on it later as chef
    res.redirect('/company/new');

  } catch (err) {
    // res.redirect('/newCompany/loginComp');
    console.log(err);
  }

});


router.post('/loginComp', async (req, res) =>{
  // first query the database to see if the user exists
  try {
    const foundCompany = await LoginComp.findOne({username: req.body.username});

    if(foundCompany){
      // if the user exists use the bcrypt compare password
      if(bcrypt.compareSync(req.body.password, foundCompany.password)){
        req.session.logged = true;
          res.redirect('/chef');

      } else {
        req.session.message = 'Username or password is wrong';
        res.redirect('/newCompany/loginComp')
      }
    } else {
      req.session.message = 'Username or password is wrong';
      res.redirect('/newCompany/loginComp')
    }

  } catch (err) {
    req.session.message = 'Username or password is wrong';
    res.redirect('/newCompany/loginComp');
  }

});




module.exports = router;
