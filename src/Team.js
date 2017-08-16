/* eslint-disable no-console */

import {maxFame, minFame} from '../config/app.json'


import Player from './Player'

class Team {
  // [
  //   {"id": 13, "fame": 88},
  //   {"id": 14, "fame": 53}
  // ],
  constructor(rawTeam) {
    this.team = rawTeam.map(player => new Player(player))
  }

  fame() {
    let totalFame = 0
    this.team.forEach(player => (totalFame += player.fame))
    return totalFame
  }

  combinedDebt() {
    let bet = 0
    this.team.forEach(player => (bet += player.betSize))
    return bet
  }

  receivePrize(prize) {
    let amountHandedOut = 0
    let keepOn = true
    const playersSorted = this.team.sort((a, b) => {
      return a.fame - b.fame
    })
    while (keepOn) {
      const before = amountHandedOut
      playersSorted.forEach(player => {
        if (player.fame < maxFame) {
          player.adjustFame(1)
          amountHandedOut += 1
          keepOn = amountHandedOut < prize // stop when there's nothing left to hand out
        }
      })
      keepOn = before < amountHandedOut // stop when nothing has been handed out this pass
    }
    return prize - amountHandedOut
  }
}

export default Team

/* eslint-enable no-console */
