var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  //res.send('respond with a resource');
    res.send('hello, ' + req.params.name);
});

module.exports = router;
