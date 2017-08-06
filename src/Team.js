/* eslint-disable no-console */

// [
//   {"id": 13, "fame": 88},
//   {"id": 14, "fame": 53}
// ],

class Team {
  constructor(rawTeam) {
    this.team = rawTeam
  }

  fame() {
    let totalFame = 0
    this.team.forEach(player => (totalFame += player.fame))
    return totalFame
  }
}

export default Team

/* eslint-enable no-console */
