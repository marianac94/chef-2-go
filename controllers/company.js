const express = require('express');
const router  = express.Router();
const Company = require('../models/company');


// index route
router.get('/', async (req, res) => {
  try {
    const foundCompany = await User.find({})
      res.render('company/index.ejs', {
        company: foundCompany
      })
  } catch(err) {
    res.send(err)
  }
});


// creating new chef and displaying it in new.ejs
router.get('/new', async (req, res) => {
  try {

    const allCompany = await Company.find();
      res.render('company/new.ejs', {
        company: allCompany
      });

  } catch(err) {
    res.send(err)
  }
});


// finding company and showing it in show.ejs
router.get('/:id', async (req, res) => {
  try {

    const findCompany = Company.findOne({'company._id': req.params.id});
      res.render('company/show.ejs', {
        chef: foundChef
      });

  } catch(err){
    res.send(err)
  }
});


// editing the company and showing it on the edit page
router.get('/:id/edit', async (req, res) => {
  try {

    const foundCompany = await Company.findById(req.params.id)
      res.render('company/edit.ejs', {
        company: foundCompany
      });

  } catch(err){
    res.send(err)
  }
});


// posting created companies in index
router.post('/', async (req, res) => {
  try {

    const createdCompany = await Company.create(req.body)
      res.redirect('/company')

  } catch(err){
    res.send(err)
  }
});


// posting the updated company in the index page
router.put('/:id', async (req, res) => {
  try {

    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body)
      res.render('/company', {
        company: updatedCompany
      });

  } catch(err) {
    res.send(err)
  }
});


// deleting the company
router.delete('/:id', async (req, res) => {
  try {

    const foundCompany = await Company.findByIdAndRemove(req.params.id)
      res.redirect('/company');

  } catch(err){
    res.send(err)
  }
});




module.exports = router;
