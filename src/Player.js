/* eslint-disable no-console */

import {betSizePercentage, initialFame, minFame} from '../config/app.json'

function calculateBetSize(fame) {
  if (fame === minFame) {
    return 0
  }
  if (fame < 10) {
    return 1
  }
  return Math.floor(fame * betSizePercentage / 100)
}

class Player {

  //   {"id": 14, "fame": 53}
  constructor(rawPlayer) {
    this.id = rawPlayer.id
    this.fame = rawPlayer.fame || initialFame
    this.betSize = calculateBetSize(this.fame)
  }

  adjustFame(amount) {
    this.fame = this.fame + amount
  }

}

export default Player

/* eslint-enable no-console */
