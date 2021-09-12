import {AccoladeConfig} from './Config'
import {Player, RawPlayer} from './Player'

export class Team {
  public team: Player[]

  constructor(rawTeam: RawPlayer[], config: AccoladeConfig) {
    this.team = rawTeam.map((player) => new Player(player, config))
  }

  fame() {
    return this.team.map((player) => player.fame).reduce((a, b) => a + b)
  }

  collectDebt() {
    let collected = 0
    this.team.forEach((player) => {
      collected += player.betSize
      player.adjustFame(-player.betSize)
    })
    return collected
  }

  handlePrize(prize: number) {
    const playersSorted = this.sortedPlayers()
    let amountHandedOut = 0
    let keepOn = true
    while (keepOn) {
      const before = amountHandedOut
      playersSorted.forEach((player) => {
        if (amountHandedOut < prize) {
          amountHandedOut += player.receivePrize()
        }
      })
      // stop when nothing has been handed out this pass
      keepOn = before < amountHandedOut
    }
    // return any fame not handed out
    return prize - amountHandedOut
  }

  // If winner fame maxes out, transfer overflow back
  handleOverflow(overflow: number) {
    const playersSorted = this.sortedPlayers()
    let amountHandedOut = 0
    let handoutPassCount = 0
    while (amountHandedOut < overflow) {
      playersSorted.forEach((player) => {
        amountHandedOut += player.receiveOverflow(handoutPassCount)
      })
      handoutPassCount++
    }
  }

  // sort by fame, ascending
  sortedPlayers(): Player[] {
    return this.team.slice().sort((a, b) => a.fame - b.fame)
  }
}
