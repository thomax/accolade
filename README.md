# Accolade

A naive skill algorithm

## Design notes
- 1 - 100 fame
- yall begin yo career with 50 fame
- each participant places a bet, a percentage of current fame rounded down
  - if you have 1 < score < 20, you're bet is 1
  - if you have 1 score, your bet is 0
- on victory, each winner keeps her fame and evenly divides the fame lost by the opponent(s)
  - if the the spoils can't be evenly divided, the one with the lowest fame get more
- on defeat, each looser forfeits her fame to the opponents
- the amount of fame present in the system at any given time is 50 * number_of_players

## Usage

```
git clone ...
npm install
npm run test
```

Accolade assumes the first team in the list won the match, then returns the same teams with adjusted fame.

```
import Accolade from 'accolade'
const config = {
  betSizePercentage: 10,
  maxFame: 100,
  minFame: 1,
  initialFame: 50
}
const accolade = Accolade(config)

const matchData = {
  teams: [
    [
      {id: 1, fame: 50},
      {id: 2, fame: 89}
    ],
    [
      {id: 3, fame: 71},
      {id: 4, fame: 40}
    ]
  ]
}
const match = accolade.createMatch(matchData)
match.rate()
match.quality()
```


## License

MIT-licensed. See LICENSE.
