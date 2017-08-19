'use strict';

var _Match = require('./Match');

var _Match2 = _interopRequireDefault(_Match);

var _defaultConfig = require('../config/defaultConfig.json');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function Accolade() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaultConfig2.default;

  return {
    createMatch: createMatch
  };
  function createMatch(matchData) {
    return new _Match2.default(matchData, this.config || _defaultConfig2.default);
  }
};