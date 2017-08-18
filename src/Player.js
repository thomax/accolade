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

  receiveOverflow(handoutPassCount) {
    const receivedLessThanBetSize = handoutPassCount < this.betSize
    console.log(`${this.id} (${this.fame} // ${this.betSize}) hpc: ${handoutPassCount}`)
    let amountReceived = 0
    if (receivedLessThanBetSize) {
      this.adjustFame(1)
      console.log(`   +1 == ${this.fame}`)
      amountReceived++
    }
    return amountReceived
  }

}

export default Player

/* eslint-enable no-console */
