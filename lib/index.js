'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 5000);
// app.use(express.static(__dirname + '/public'))
// app.use(express.static(__dirname + '/stylesheets'))
//
// app.set('views', path.join(__dirname, 'views'))
// app.set("view options", { layout: false })

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use('/', _routes2.default);

app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost: ' + app.get('port'));
});

module.exports = app;