"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-console */

function calculateBetSize(fame, config) {
  if (fame === config.minFame) {
    return 0;
  }
  if (fame < 10) {
    return 1;
  }
  return Math.floor(fame * config.betSizePercentage / 100);
}

var Player = function () {
  function Player(rawPlayer, config) {
    _classCallCheck(this, Player);

    this.id = rawPlayer.id;
    this.fame = rawPlayer.fame || config.initialFame;
    this.betSize = calculateBetSize(this.fame, config);
    this.config = config;
  }

  _createClass(Player, [{
    key: "adjustFame",
    value: function adjustFame(amount) {
      this.fame = this.fame + amount;
    }
  }, {
    key: "receivePrize",
    value: function receivePrize() {
      if (this.fame < this.config.maxFame) {
        this.adjustFame(1);
        return 1;
      }
      return 0;
    }
  }, {
    key: "receiveOverflow",
    value: function receiveOverflow(handoutPassCount) {
      var receivedLessThanBetSize = handoutPassCount < this.betSize;
      var amountReceived = 0;
      if (receivedLessThanBetSize) {
        this.adjustFame(1);
        amountReceived++;
      }
      return amountReceived;
    }
  }]);

  return Player;
}();

exports.default = Player;

/* eslint-enable no-console */