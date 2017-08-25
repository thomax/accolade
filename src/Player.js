/* eslint-disable no-console */

function calculateBetSize(fame, config) {
  if (fame === config.minFame) {
    return 0
  }
  if (fame < 10) {
    return 1
  }
  return Math.floor(fame * config.betSizePercentage / 100)
}

class Player {

  constructor(rawPlayer, config) {
    this.rawPlayer = rawPlayer
    this.fame = rawPlayer.fame || config.initialFame
    this.betSize = calculateBetSize(this.fame, config)
    this.config = config
  }

  adjustFame(amount) {
    this.fame = this.fame + amount
  }


  receivePrize() {
    if (this.fame < this.config.maxFame) {
      this.adjustFame(1)
      return 1
    }
    return 0
  }

  receiveOverflow(handoutPassCount) {
    const receivedLessThanBetSize = handoutPassCount < this.betSize
    let amountReceived = 0
    if (receivedLessThanBetSize) {
      this.adjustFame(1)
      amountReceived++
    }
    return amountReceived
  }

  export(options = {}) {
    const player = Object.assign({}, this.rawPlayer, {fame: this.fame})
    if (options.includeBetSize) {
      player.betSize = this.betSize
    }
    return player
  }

}

export default Player

/* eslint-enable no-console */
