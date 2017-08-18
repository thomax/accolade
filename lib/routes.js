'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Match = require('./Match');

var _Match2 = _interopRequireDefault(_Match);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

router.get('/', function (req, res) {
  res.send('Accolade sez hello');
});

router.post('/rate', function (req, res) {
  var match = new _Match2.default(req.body);
  var result = match.rate();
  res.status(200).type('application/json').send(JSON.stringify(result, null, 2));
});

router.post('/quality', function (req, res) {
  var match = new _Match2.default(req.body);
  var result = {
    quality: match.quality(),
    teams: match.teams.map(function (item) {
      return item.team.map(function (player) {
        return { id: player.id, fame: player.fame, betSize: player.betSize };
      });
    })
  };
  res.status(200).type('application/json').send(JSON.stringify(result, null, 2));
});

module.exports = router;