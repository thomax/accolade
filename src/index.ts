import {Match, MatchData} from './Match'
import {AccoladeConfig, defaultConfig} from './Config'

export function createMatch(matchData: MatchData, config: AccoladeConfig = defaultConfig) {
  return new Match(matchData, config || defaultConfig)
}

export {defaultConfig, MatchData}
