const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const Chef = require('../models/chef');

// index route
router.get('/', async (req, res) => {
  try {
    const foundUser = await User.find({})
      res.render('user/index.ejs', {
        user: foundUser
      })
  } catch(err) {
    res.send(err)
  }
});

router.get('/new', async (req, res) => {
  try {
    res.render('user/new.ejs')
  } catch(err) {
    res.send(err)
  }
});







module.exports = router;
