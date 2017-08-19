'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-console */

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Team = function () {
  function Team(rawTeam, config) {
    _classCallCheck(this, Team);

    this.team = rawTeam.map(function (player) {
      return new _Player2.default(player, config);
    });
  }

  _createClass(Team, [{
    key: 'fame',
    value: function fame() {
      return this.team.map(function (player) {
        return player.fame;
      }).reduce(function (a, b) {
        return a + b;
      });
    }
  }, {
    key: 'collectDebt',
    value: function collectDebt() {
      var collected = 0;
      this.team.forEach(function (player) {
        collected += player.betSize;
        player.adjustFame(-player.betSize);
      });
      return collected;
    }
  }, {
    key: 'handlePrize',
    value: function handlePrize(prize) {
      var playersSorted = this.sortedPlayers();
      var amountHandedOut = 0;
      var keepOn = true;
      while (keepOn) {
        var before = amountHandedOut;
        playersSorted.forEach(function (player) {
          if (amountHandedOut < prize) {
            amountHandedOut += player.receivePrize();
          }
        });
        // stop when nothing has been handed out this pass
        keepOn = before < amountHandedOut;
      }
      // return any fame not handed out
      return prize - amountHandedOut;
    }

    // If winner fame maxes out, transfer overflow back

  }, {
    key: 'handleOverflow',
    value: function handleOverflow(overflow) {
      var playersSorted = this.sortedPlayers();
      var amountHandedOut = 0;
      var handoutPassCount = 0;
      while (amountHandedOut < overflow) {
        playersSorted.forEach(function (player) {
          amountHandedOut += player.receiveOverflow(handoutPassCount);
        });
        handoutPassCount++;
      }
    }

    // sort by fame, ascending

  }, {
    key: 'sortedPlayers',
    value: function sortedPlayers() {
      return [].concat(this.team).sort(function (a, b) {
        return a.fame - b.fame;
      });
    }
  }]);

  return Team;
}();

exports.default = Team;

/* eslint-enable no-console */