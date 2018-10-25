const express  = require('express');
const router   = express.Router();
const LoginInfo    = require('../models/loginInfo');
const bcrypt = require('bcrypt');

const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');



router.get('/login',(req, res) =>{
  const message = req.session.message;
  delete req.session.message;
  res.render('newChef/login.ejs', {
    message: message
  });
});


router.post('/register', async (req, res) => {
  try {
    // going to store our password in variable
    const password      = req.body.password;
    // create the hash for password
    const passwordHash  = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    console.log(passwordHash);

    // Create an object to put into our database into the User Model
    const chefEntry     = {};
    chefEntry.name  = req.body.name;
    chefEntry.address   = req.body.address;
    chefEntry.phone     = req.body.phone;
    chefEntry.username     = req.body.username;
    chefEntry.password  = passwordHash;

    const chef = await LoginInfo.create(chefEntry);
    console.log(chef);

    // initializing the session
    // req.session.username = req.body.username;
    req.session.logged  = true;
    req.session.message = '';
    // *************** work on it later as chef
    res.redirect('/chef/new');
    // res.redirect('/chef');git
  } catch (err) {
    res.redirect('/newChef/login');
    console.log(err);
  }

});


router.post('/login', async (req, res) =>{
  // first query the database to see if the user exists
  try {
    const foundChef = await LoginInfo.findOne({username: req.body.username});

    if(foundChef){
      // if the user exists use the bcrypt compare password
      if(bcrypt.compareSync(req.body.password, foundChef.password)){
        req.session.logged = true;
        console.log('line 64', foundChef);

        res.redirect('/chef/' + foundChef._id);
      } else {
        req.session.message = 'Username or password is wrong';
        res.redirect('/newChef/login')
      }
    } else {
      req.session.message = 'Username or password is wrong';
      res.redirect('/newChef/login')
    }

  } catch (err) {
    // res.send(err);
    // res.status(err, body).send(body);
    // res.status(err);
    req.session.message = 'Username or password is wrong';
    res.redirect('/newChef/login');
  }

});

router.get('/logout', (req, res) =>{
  req.session.destroy((err) =>{
    if(err){
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
});



module.exports = router;
