'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Match = require('./Match');

var _Match2 = _interopRequireDefault(_Match);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();


router.get('/sup', function (req, res) {
  res.send('sup?');
});

router.post('/rate', function (req, res) {
  var match = new _Match2.default(req.body);
  var result = match.rate();
  res.status(200).type('application/json').send(JSON.stringify(result, null, 2));
});

router.post('/quality', function (req, res) {
  var match = new _Match2.default(req.body);
  var result = {
    quality: match.quality()
  };
  res.status(200).type('application/json').send(JSON.stringify(result, null, 2));
});

// app.post('/:target', function (req, res) {
//   var targetName = req.params.target.split(':')[0]
//   var token = req.params.target.split(':')[1]
//   var string = req.body.string
//   if (string.length > 512) {
//     return res.status(400).send('String cannot exceed 512 characters')
//   }
//   data.appendString(targetName, token, string, function(result) {
//     if (result === false) {
//       return res.status(403).send('Token mismatch')
//     }
//     res.type('application/json').status(201).send(result)
//   })
// })

module.exports = router;