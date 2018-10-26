const express = require('express');
const router = express.Router();
const Chef = require('../models/chef');
const Company = require('../models/company');


// index route
router.get('/', async (req, res) => {
  try {

    const foundChef = await Chef.find({});
    res.render('chef/index.ejs', {
      chef: foundChef
    });

  } catch (err) {
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

  } catch (err) {
    res.send(err)
  }
});


// find chef by id when login (giving an id the minute he/she register into the page)
router.get('/:id', async (req, res) => {
  try {

    const findChef = await Chef.findById(req.params.id);
    res.render('chef/show.ejs', {
      chef: findChef
    });

  } catch(err) {
    console.log(err);
    res.send(err)
  }
});


// posting the new chef in the index
router.post('/', async (req, res) => {
  try {

    const createdChef = await Chef.create(req.body)
    res.redirect('/chef')

  } catch (err) {
    res.send(err)
  }
});


// edit the chef
router.get('/:id/edit', async (req, res) => {
  try {

    const findChef = await Chef.findById(req.params.id);
    console.log(findChef, 'edit works');
    res.render('chef/edit.ejs', {
      chef: findChef
    });

  } catch (err) {
    res.send(err)
  }
});



router.put('/:id', async (req, res)=>{
  try {

    console.log(req.body);
    const updateChef = await Chef.updateOne({ '_id' : req.params.id}, req.body)
    res.redirect('/chef/' + req.params.id);

  } catch(err) {
    res.send(err)
  }
});



// creating the delete route
router.delete('/:id', async (req, res) => {
  try {

    const deleteChef = await Chef.findByIdAndRemove(req.params.id)
    res.redirect('/chef');

  } catch (err) {
    res.send(err)
  }
});





module.exports = router;
