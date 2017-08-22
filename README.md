# Accolade

A naive, stateless, ladder-like skill algorithm intended for use in foosball, but might also work for other games where two teams are opposed, such as Counter-Strike or table tennis.

Accolade is based on the following principles:

- `Fame` is the currency in question.
- Each players begins with a mediocre fame value (default `initialFame: 50`).
- There is an absolute floor (default `minFame: 1`) and ceiling (default `minFame: 100`) fame value.
- When competing, each participant bets a percentage of their fame (default `betSizePercentage: 10`).
- Winners divide the pot, losers forfeit their fame.
- A competitor with 1 fame can't go lower, and thereby risks nothing by competing. Likewise, a competitor with 100 fame can't go higher and can only hope to keep the same position.
- If one winner can't receive all fame gained from a match, her team mates receive the overflow.
- If none of the winners are able to absorb all the fame (due to maxed out values), the fame is transferred back to the loosers.


## Usage

Accolade assumes the first team in the list (`matchData.teams`) are the winners and returns teams and players in the same order, with fame adjusted according to the internal algorithm.

```
npm install accolade
```

```
import Accolade from 'accolade'
const accolade = Accolade() // pass your own config object to override config/defaultConfig.json

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
match.quality() // get pre-match betSize for each player
match.rate() // calculate match result -> change in fame
```

## License

MIT-licensed. See LICENSE.
