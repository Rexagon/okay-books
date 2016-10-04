// BOOKS APPLICATION

$('#submit').on('click', function() {
    var form = $('#application-form').serializeArray();
    var application = {};
    for (var i = 0; i < form.length; ++i) {
        application[form[i].name] = form[i].value;
    }
    if (application.name == '' || application.phone == '' || application.email == '') {
        alert('Пожалуйста укажите Ф.И.О, номер телефона и адрес электронной почты.');
    } else {
        $.post('/application', application, function(res) {
            if (!res.err) {
                $(':input', '#application-form').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
                alert('Ваша заявка на расчёт издания была отправлена! Мы свяжемся с Вами после её обработки.');
            } else if (res.err == 'email') {
                alert('Введите действительный адрес электронной почты.');
            }
        });
    }
});


// CALL APPLICATION

$('#submit').on('click', function() {
    var form = $('#application-form').serializeArray();
    var application = {};
    for (var i = 0; i < form.length; ++i) {
        application[form[i].name] = form[i].value;
    }
    if (application.phone == '') {
        alert('Пожалуйста укажите ваш номер телефона.');
    } else {
        $.post('/call_application', application, function(res) {
            if (!res.err) {
                $(':input', '#application-form').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
                alert('Ожидайте звонка в ближайшее время.');
            } else if (res.err == 'email') {
                alert('Введите действительный адрес электронной почты.');
            }
        });
    }
});