var express = require('express');
var router = express.Router();

router.get('/contacts', function(req, res) {
    res.render('contacts');
});

module.exports = router;
