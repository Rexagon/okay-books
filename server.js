var express = require('express');
var body_parser = require('body-parser');
var path = require('path');

//Configure app
var port = process.env.PORT || 1336;
var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

//Use middleware
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Define routes
app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/about.js'));
app.use('/', require('./routes/contacts.js'));
app.use('/', require('./routes/application.js'));

app.use(function(req, res, next) {
	res.status(404).render('error_pages/404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('error_pages/500');
});

//Start server
app.listen(port, function() {
  console.log('Server is running on port', port);
});