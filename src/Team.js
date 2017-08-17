/* eslint-disable no-console */

import {maxFame} from '../config/app.json'


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

  collectDebt() {
    let collected = 0
    this.team.forEach(player => {
      collected += player.betSize
      player.adjustFame(-player.betSize)
    })
    return collected
  }

  receivePrize(prize) {
    let amountHandedOut = 0
    let keepOn = true
    const playersSorted = this.sortedPlayers()
    while (keepOn) {
      const before = amountHandedOut
      let anyLeft = amountHandedOut < prize
      playersSorted.forEach(player => {
        const playerCanTakeMore = player.fame < maxFame
        if (playerCanTakeMore && anyLeft) {
          player.adjustFame(1)
          amountHandedOut++
        }
        anyLeft = amountHandedOut < prize
      })
      // stop when nothing has been handed out this pass
      keepOn = before < amountHandedOut
    }
    // return any fame not handed out
    return prize - amountHandedOut
  }

  // Winners couldn't take all the fame, transfer overflow back
  receiveOverflow(overflow) {
    console.log('receiveOverflow', overflow)
    let amountHandedOut = 0
    const playersSorted = this.sortedPlayers()
    let anyLeft = amountHandedOut < overflow
    while (anyLeft) {
      let handoutCounter = 1
      playersSorted.forEach(player => {
        console.log(`${player.id} (${player.fame})`)
        const playerReceivedLessThanBetSize = handoutCounter < player.betSize
        if (playerReceivedLessThanBetSize) {
          player.adjustFame(1)
          console.log(`   +1 == ${player.fame}`)
          amountHandedOut++
        }
        anyLeft = amountHandedOut < overflow
      })
      handoutCounter++
    }
  }

  sortedPlayers() {
    return [].concat(this.team).sort((a, b) => {
      return a.fame - b.fame
    })
  }
}

export default Team

/* eslint-enable no-console */
