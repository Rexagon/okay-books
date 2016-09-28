var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/googlec7bdfe46dbeeb9c2.html', function(req, res) {
    res.render('googlec7bdfe46dbeeb9c2');
});


module.exports = router;
