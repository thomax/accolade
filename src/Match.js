/* eslint-disable no-console */
import Team from './Team'

class Match {

  constructor(rawMatch) {
    this.teams = rawMatch.teams.map(team => new Team(team))
  }

  rate() {
    const winningTeam = this.teams[0]
    const loosingTeam = this.teams[1]

    // collect debt from loosing team
    const loosingTeamDebt = loosingTeam.collectDebt()

    // transfer fame from looser to winner
    const overflow = winningTeam.handlePrize(loosingTeamDebt)

    // if winner cant take all, transfer back
    loosingTeam.handleOverflow(overflow)

    return {
      teams: [
        winningTeam.team.map(player => {
          return {id: player.id, fame: player.fame}
        }),
        loosingTeam.team.map(player => {
          return {id: player.id, fame: player.fame}
        })
      ]
    }
  }

  quality() {
    const teamOneFame = this.teams[0].fame()
    const teamOneTwo = this.teams[1].fame()
    return teamOneFame / (teamOneFame + teamOneTwo) * 100
  }
}

export default Match

/* eslint-enable no-console */
