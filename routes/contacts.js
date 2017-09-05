var express = require('express');
var router = express.Router();

router.get('/contacts', function(req, res) {
    res.render('_template', {
        page: 'contacts',
        scripts: []
    });
});

module.exports = router;