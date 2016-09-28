var express = require('express');
var router = express.Router();

router.get('/application', function(req, res) {
    res.render('application');
});

module.exports = router;
