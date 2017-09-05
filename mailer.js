var nodemailer = require('nodemailer');

var smtp_config = {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'mailer@okay-agency.ru',
        pass: 'mailermailer'
    }
};

var _transporter = nodemailer.createTransport(smtp_config);

module.exports.validate = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

module.exports.send = function(parameters, callback) {
	_transporter.sendMail(parameters, callback);
};
