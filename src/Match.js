/* eslint-disable no-console */
import Team from "./Team";

// {
//   "teams": [
//     [
//       {"id": 13, "fame": 88},
//       {"id": 14, "fame": 53}
//     ],
//     [
//       {"id": 37, "fame": 75},
//       {"id": 17, "fame": 62}
//     ]
//   ]
// }

class Match {
  constructor(rawMatch) {
    this.teams = rawMatch.teams.map(team => new Team(team))
  }

  rate() {
    const winningTeam = this.teams[0]
    const loosingTeam = this.teams[1]

    // collect debt from loosing team
    const loosingTeamDebt = loosingTeam.collectDebt()
    // transfer from looser to winner
    const overflow = winningTeam.receivePrize(loosingTeamDebt)
    // if winner cant take all, transfer back
    loosingTeam.receiveOverflow(overflow)
    return {
      teams: [
        winningTeam.team.map(player => {
          return {id: player.id, fame: player.fame}
        }),
        loosingTeam.team.map(player => {
          return {id: player.id, fame: player.fame}
        }),
      ]
    }
  }

  quality() {
    const pinkFame = this.teams[0].fame()
    const blueFame = this.teams[1].fame()
    return pinkFame / (pinkFame + blueFame) * 100
  }
}

export default Match

/* eslint-enable no-console */
