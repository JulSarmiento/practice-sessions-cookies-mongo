const express = require('express');
const router = express.Router();


// CREATE COOKIE
router.post('/', (req, res) => {
  const {name, value, time} = req.body;
  const config = {
    signed: true
  };

  if(isNaN(time) || time < 1){
    return res.status(400).json({
      status: false,
      message: "Bad cookie time format."
    });
  }

  if(!time) {
    return res.cookie(name, value, config).send(`Cookie ${name} set.`); //Sets name = vader
  }
  config.maxAge = parseInt(time) * 1000;
  res.cookie(name, value, config).send(`Cookie ${name} set.`); //Sets name = vader
});

// GET ALL COOKIES
router.get('/', (req, res) => {
  console.log(JSON.stringify(req.signedCookies, null, 2))
  res.status(200).json(req.signedCookies);
});

// DELETE A COOKIE
router.delete('/:name', (req, res) => {
  const {name} = req.params;
  if(!Object.hasOwn(req.signedCookies, name)){
    return res.status(400).json({
      status: false,
      message: `The cookie ${name} does not exist.`
    });
  };

  res.clearCookie(name).send(`Cookie ${name} deleted.`); //Sets name = vader
});




module.exports = router;