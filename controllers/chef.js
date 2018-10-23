const express = require('express');
const router  = express.Router();
const Chef = require('../models/chef');
const User = require('../models/user');


// index route
router.get('/', async (req, res) => {
  console.log('h2');
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
    const findChef = await Chef.findById(req.params.id)
      res.render('chef/index.ejs', {
        chef: findChef
      })
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
      })
  } catch(err){
    res.send(err)
  }
});

// creating the delete route
router.delete('/:id', async (req, res) => {
  try {
    const foundChef = await Chef.findByIdAndRemove(req.params.id)
      res.redirect('/chef')
  } catch(err){
    res.send(err)
  }
});


router.put('/:id', async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
  try {
    const updatedChef = await Chef.findByIdAndUpdate(req.params.id, req.body)
      res.render('/chef', {
        chef: updatedChef
      })
  } catch(err) {
    res.send(err)
  }
})





module.exports = router;
