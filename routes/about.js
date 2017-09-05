var express = require('express');
var router = express.Router();

router.get('/about', function(req, res) {
    res.render('_template', {
        page: 'about',
        scripts: []
    });
});

module.exports = router;
