import {AccoladeConfig} from './Config'
import {RawPlayer} from './Player'
import {Team} from './Team'

export interface MatchData {
  teams: RawPlayer[][]
}
export class Match {
  public teams: Team[]

  constructor(rawMatch: MatchData, config: AccoladeConfig) {
    this.teams = rawMatch.teams.map((team) => new Team(team, config))
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
        winningTeam.team.map((player) => {
          return player.export()
        }),
        loosingTeam.team.map((player) => {
          return player.export()
        }),
      ],
    }
  }

  quality() {
    const teamOneFame = this.teams[0].fame()
    const teamOneTwo = this.teams[1].fame()
    return {
      quality: (teamOneFame / (teamOneFame + teamOneTwo)) * 100,
      teams: this.teams.map((item) => {
        return item.team.map((player) => {
          return player.export({includeBetSize: true})
        })
      }),
    }
  }
}
