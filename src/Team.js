/* eslint-disable no-console */

import { maxFame } from '../config/app.json'

import Player from './Player'

class Team {
  // [
  //   {'id': 13, 'fame': 88},
  //   {'id': 14, 'fame': 53}
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
    console.log('\nreceivePrize', prize)
    let amountHandedOut = 0
    let keepOn = true
    const playersSorted = this.sortedPlayers()
    while (keepOn) {
      const before = amountHandedOut
      playersSorted.forEach(player => {
        const anyLeft = amountHandedOut < prize
        console.log(`${player.id} (${player.fame})`)
        const playerCanTakeMore = player.fame < maxFame
        if (playerCanTakeMore && anyLeft) {
          player.adjustFame(1)
          console.log(`   +1 == ${player.fame}`)
          amountHandedOut++
        }
      })
      // stop when nothing has been handed out this pass
      keepOn = before < amountHandedOut
    }
    // return any fame not handed out
    return prize - amountHandedOut
  }

  // Winners couldn't take all the fame, transfer overflow back
  handleOverflow(overflow) {
    console.log('\nhandleOverflow', overflow)
    let amountHandedOut = 0
    const playersSorted = this.sortedPlayers()
    let handoutPassCount = 0
    while (amountHandedOut < overflow) {
      playersSorted.forEach(player => {
        amountHandedOut += player.receiveOverflow(handoutPassCount)
      })
      console.log('  -- next pass')
      handoutPassCount++
    }
  }

  // sort by fame, ascending
  sortedPlayers() {
    return [].concat(this.team).sort((a, b) => {
      return a.fame - b.fame
    })
  }
}

export default Team

/* eslint-enable no-console */
