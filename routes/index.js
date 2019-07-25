var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MIKC Tools', page:'Login', menuId:'home',message:'' });
});

module.exports = router;
