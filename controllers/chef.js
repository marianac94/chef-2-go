const express = require('express');
const router  = express.Router();
const Chef = require('../models/chef');


// index route
router.get('/', async (req, res) => {
  try {

    const foundChef = await Chef.find({});
    res.render('chef/index.ejs', {
      chef: foundChef
    });

  } catch(err){
    res.send(err);
  }
});


// creating new chef
router.get('/new', async (req, res) => {
  try {

    const allChef = await Chef.find();
      res.render('chef/new.ejs', {
        chef: allChef
      });

  } catch(err) {
    res.send(err)
  }
});


// giving an id to the chef
router.get('/:id', async (req, res) => {
  try {
    const findChef = Chef.findOne({'chef._id': req.params.id});
    const foundChef = await Promise.all([findChef]);

      res.render('chef/index.ejs', {
        chef: foundChef
      });
  } catch(err){
    res.send(err)
  }
});


// posting the new chef in the index
router.post('/', async (req, res) => {
  try {
    const createdChef = await Chef.create(req.body)
      res.redirect('/chef')
  } catch(err){
    res.send(err)
  }
});


// edit the chef
router.get('/:id/edit', async (req, res) => {
  try {

    const foundChef = await Chef.findById(req.params.id)
      res.render('chef/edit.ejs', {
        chef: foundChef
      });

  } catch(err){
    res.send(err)
  }
});


// creating the delete route
router.delete('/:id', async (req, res) => {
  try {

    const foundChef = await Chef.findByIdAndRemove(req.params.id)
      res.redirect('/chef');

  } catch(err){
    res.send(err)
  }
});


// update the chef index page
router.put('/:id', async (req, res) => {
  try {

    const updatedChef = await Chef.findByIdAndUpdate(req.params.id, req.body)
      res.render('/chef', {
        chef: updatedChef
      });

  } catch(err) {
    res.send(err)
  }
});





module.exports = router;
