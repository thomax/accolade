/* eslint-disable no-console */

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
}

export default Team

/* eslint-enable no-console */
