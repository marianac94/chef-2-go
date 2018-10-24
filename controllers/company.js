const express = require('express');
const router  = express.Router();
const Company = require('../models/company');
const Chef = require('../models/chef');


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






module.exports = router;
