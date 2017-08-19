import Match from './Match'
import defaultConfig from '../config/defaultConfig.json'

module.exports = function Accolade(config = defaultConfig) {
  return {
    createMatch: createMatch
  }
  function createMatch(matchData) {
    return new Match(matchData, this.config || defaultConfig)
  }
}
