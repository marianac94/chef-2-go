const express = require('express');
const router = express.Router();
const Chef = require('../models/chef');
const login = require('../models/loginInfo')


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


// giving an id to the chef
// router.get('/:id', async (req, res) => {
//   try {
//
//     const findChef = await login.findById(req.params.id);
//     // const findList = await Chef.findOne({'_id': req.params.id});
//     //   console.log(findChef);
//     //   console.log(findList);
//     // const [findChef, findList] =
//     // Promise.all([findChef, findList]);
//
//     res.render('chef/show.ejs', {
//       login: findChef
//       // chef: findList
//     });
//
//   } catch (err) {
//     res.send(err)
//   }
// });
// find chef by id when login (giving an id the minute he/she register into the page)
router.get('/:id', async (req, res) => {
  try {

    const findChef = await login.findById(req.params.id);
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

    const findChef = await login.findById(req.params.id);
    console.log(findChef, 'edit works');
    res.render('chef/edit.ejs', {
      chef: findChef
    });

  } catch (err) {
    res.send(err)
  }
});


// update the chef index page
router.put('/:id', async (req, res) => {
  try {

    const updateChef = await login.findOneAndUpdate(req.params.id, req.body);
    console.log(updateChef, 'id works');
    res.redirect('/chef/' + updateChef._id);

  } catch (err) {
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
