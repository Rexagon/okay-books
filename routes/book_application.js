var express = require('express');
var router = express.Router();

var mailer = require('../mailer.js');


router.get('/book_application', function(req, res) {
    res.render('_template', {
        page: 'book_application',
        scripts: [
            'book_application'
        ]
    });
});

router.post('/book_application', function(req, res) {
    var application = req.body;

    if (mailer.validate(application.email)) {
        for (var key in application) {
            if (application.hasOwnProperty(key)) {
                application[key] = application[key].replace(/(<([^>]+)>)/ig, "");
            }
        }

        var text = '';
        text += 'Тип издания: ' + application.book_type + '<br>';
        text += 'Объем издания: ' + application.volume + '<br>';
        text += 'Желаемый формат издания: ' + application.book_format + '<br>';
        text += 'Фотоиллюстрации, рисунки, графики: ' + application.illustrations + '<br>';
        text += 'Текстовые материалы: ' + application.texts + '<br>';
        text += 'Тип обложки: ' + application.cover_type + '<br>';
        text += 'Тип бумаги: ' + application.paper_type + '<br>';
        text += 'Красочность печати: ' + application.colors_type + '<br>';
        text += 'Тираж: ' + application.editions_num + '<br>';
        text += 'Сроки производства: ' + application.deadline + '<br>';
        text += 'Дополнительные требования к изданию: ' + application.description + '<br>';
        text += 'Контактный E-mail: ' + application.email + '<br>';
        text += 'Ф.И.О: ' + application.name + '<br>';
        text += 'Контактный телефон: ' + application.phone;

        mailer.send({
            from: 'books.okay-agency <mailer@okay-agency.ru>',
            to: 'jk@okay.ru, jk@okay-agency.ru, okay.agency@yandex.ru',
            subject: 'Заявка на книгу',
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
