const express = require('express');
const router = express.Router();
const geosearch =  require('../../Geocode/geosearch');


/* GET users listing. */
router.get('/', function (req, res, next) {
  geosearch("paschim vihar")
    .then((data) => { 
      console.log(data);
      res.json(data)
    })
    .catch(err => {
      res.json(err);
  })
});

/* GET user profile. */
router.get('/profile', function(req, res, next) {
    res.send(req.user);
});

module.exports = router;