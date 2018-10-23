const express  = require('express');
const router   = express.Router();
const LoginInfo    = require('../models/loginInfo');
const bcrypt = require('bcrypt');

const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');


router.get('/login',(req, res) =>{
    console.log(req.session);
  res.render('newChef/login.ejs', {
    message: req.session.message
  });
});


router.post('/register', async (req, res) => {
    // going to store our password in variable
    const password      = req.body.password;
    // create the hash for password
    const passwordHash  = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log(passwordHash);

    // Create an object to put into our database into the User Model
    const chefEntry     = {};
    chefEntry.name      = req.body.name;
    chefEntry.address   = req.body.address;
    chefEntry.phone     = req.body.phone;
    chefEntry.username  = req.body.username;
    chefEntry.password  = passwordHash;

    const chef = await LoginInfo.create(chefEntry);
    console.log(chef);
    // initializing the session
    // req.session.username = req.body.username;
    req.session.logged  = true;
    req.session.message = '';
    // *************** work on it later as chef
    res.redirect('/chef/new');
});


router.post('/login', async (req, res) =>{
  // first query the database to see if the user exists
  try {
    const foundChef = await LoginInfo.findOne({username: req.body.username});
    console.log(foundChef);

    if(foundChef){
      // if the user exists use the bcrypt compare password
      if(bcrypt.compareSync(req.body.password, foundChef.password)){
        req.session.logged = true;
        // ********* use later to redirect to chef profile
        res.redirect('/chef');
      } else {
        req.session.message = 'Username or password is wrong';
        res.redirect('/newChef/login')
      } // end of foundUser
    } else {
      // req.session.message = 'Username or password is wrong';
      res.session.message = 'Username or password is wrong';
      res.redirect('/newChef/login');
    }
  } catch (err) {
    res.send(err);
  }
});


module.exports = router;
