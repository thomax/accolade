'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-console */


var _Team = require('./Team');

var _Team2 = _interopRequireDefault(_Team);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Match = function () {
  function Match(rawMatch) {
    _classCallCheck(this, Match);

    this.teams = rawMatch.teams.map(function (team) {
      return new _Team2.default(team);
    });
  }

  _createClass(Match, [{
    key: 'rate',
    value: function rate() {
      var winningTeam = this.teams[0];
      var loosingTeam = this.teams[1];

      // collect debt from loosing team
      var loosingTeamDebt = loosingTeam.collectDebt();

      // transfer fame from looser to winner
      var overflow = winningTeam.handlePrize(loosingTeamDebt);

      // if winner cant take all, transfer back
      loosingTeam.handleOverflow(overflow);

      return {
        teams: [winningTeam.team.map(function (player) {
          return { id: player.id, fame: player.fame };
        }), loosingTeam.team.map(function (player) {
          return { id: player.id, fame: player.fame };
        })]
      };
    }
  }, {
    key: 'quality',
    value: function quality() {
      var teamOneFame = this.teams[0].fame();
      var teamOneTwo = this.teams[1].fame();
      return teamOneFame / (teamOneFame + teamOneTwo) * 100;
    }
  }]);

  return Match;
}();

exports.default = Match;

/* eslint-enable no-console */