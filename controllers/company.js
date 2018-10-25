const express = require('express');
const router  = express.Router();
const Company = require('../models/company');
const Chef = require('../models/chef');

// index route
router.get('/', async (req, res) => {
  try {

    const foundCompany = await Company.find({});
    res.render('company/chefList.ejs', {
      company: foundCompany
    });

  } catch (err) {
    res.send(err);
  }
});


// route to book the chef
router.get('/new', async (req, res) => {
  try {

    const bookCompany = await Chef.find();
    res.render('company/new.ejs', {
      chef: bookCompany
    });

  } catch (err) {
    res.send(err)
  }
});


// showing each chef when click
router.get('/:id', async (req, res) => {
  try {

    const findList = await Chef.findById(req.params.id);
    console.log(findList);
    res.render('company/chefList.ejs', {
      chef: findList
    });

  } catch(err) {
    res.send(err)
  }
});


// route to the summary of the order
router.post('/summary', async (req, res) => {
  try {

    const createdCompany = await Company.create(req.body)
    res.redirect('/company/summary')

  } catch (err) {
    res.send(err)
  }
});





module.exports = router;
