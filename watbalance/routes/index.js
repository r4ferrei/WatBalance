var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {content: 'home'});
});

// router.post('/fetch', function(req, res, next) {
// 
// });

module.exports = router;
