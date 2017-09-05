var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('_template', {
        page: 'main',
        scripts: []
    });
});

module.exports = router;