var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

var htmlRegex = /(<([^>]+)>)/ig;
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
var smtpConfig = {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'mailer@okay-agency.ru',
        pass: 'mailermailer'
    }
};

var _transporter = nodemailer.createTransport(smtpConfig);

router.get('/application', function(req, res) {
    res.render('application');
});

router.post('/application', function(req, res) {
	var application = req.body;
	for (var key in application) {
  		if (application.hasOwnProperty(key)) {
			application[key] = application[key].replace(htmlRegex, "");
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

	if (validateEmail(application.email)) {
		_transporter.sendMail({
			from: 'books.okay-agency <mailer@okay-agency.ru>',
			to: 'jk@okay.ru, jk@okay-agency.ru, okay.agency@yandex.ru',
			subject: 'Книги',
			html: text,
			text: text
		}, function(error, info){
			if (error) {
				console.log(error);
				res.send({err: 'sender'});
			} else {
				res.send({});
			}
		});
	} else {
		res.send({err: 'email'});
	}
});

module.exports = router;
