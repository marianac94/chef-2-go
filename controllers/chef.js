const express = require('express');
const router = express.Router();
const Chef = require('../models/chef');
const login = require('../models/loginInfo');
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

// still working on routes (not working)
router.put('/:id', (req, res)=>{
  Chef.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, updateChef) => {

    login.findOne({'chef._id': req.params.id}, (err, findChef) => {

      if(findChef._id.toString() !== req.body.loginId){
          findChef.login.id(req.params.id).remove()
          findChef.save((err, savedFoundChef) => {
            Chef.findById(req.body.loginId, (err, newChef) => {
              newChef.login.push(updatelogin);
              newChef.save((err, savedNewChef) => {
                res.redirect('/index');
            });
          });
        });
      } else {
        findChef.login.id(req.params.id).remove();
        findChef.login.push(updateChef);
        findChef.save((err, data) => {
          res.redirect('/index');
        });
      }
    });
  });
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
