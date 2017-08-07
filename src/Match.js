/* eslint-disable no-console */
import Team from './Team'

// [
//   {"id": 13, "fame": 88},
//   {"id": 14, "fame": 53}
// ],
// [
//   {"id": 37, "fame": 75},
//   {"id": 17, "fame": 62}
// ]


class Match {

  constructor(rawMatch) {
    this.teams = rawMatch.teams.map(team => new Team(team))
  }

  rate() {
    return 2
  }

  quality() {
    const pinkFame = this.teams[0].fame()
    const blueFame = this.teams[1].fame()
    return (pinkFame / (pinkFame + blueFame)) * 100
  }

}

export default Match

/* eslint-enable no-console */
