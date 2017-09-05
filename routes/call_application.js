var express = require('express');
var router = express.Router();

var mailer = require('../mailer.js');


router.get('/call_application', function(req, res) {
    res.render('_template', {
        page: 'call_application',
        scripts: [
            'call_application'
        ]
    });
});

router.post('/call_application', function(req, res) {
    var application = req.body;


    if (mailer.validate(application.email)) {
        var text = '';
        text += 'Имя: ' + application.name + '<br>';
        text += 'Email: ' + application.email + '<br>';
        text += 'Номер телефона: ' + application.phone + '<br><br>';
        text += 'Текст сообщения: ' + application.message;

        mailer.send({
            from: 'books.okay-agency <mailer@okay-agency.ru>',
            to: 'jk@okay.ru, jk@okay-agency.ru, okay.agency@yandex.ru',
            subject: 'Заказ звонка',
            html: text,
            text: text
        }, function(error, info) {
            if (error) {
                console.log(error);
                res.send({ err: 'sender' });
            } else {
                res.send({});
            }
        });
    } else {
        res.send({ err: 'email' });
    }
});

module.exports = router;
