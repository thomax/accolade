TODO: handoutPassCount is 0

# accolade
A naive skill algorithm behind an equally naive API

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

## Some Examples, given bet size 10%

### Two players on each team
pink-team: 80 + 54 [bet size 8 + 5]
blue-team: 88 + 49 [bet size 8 + 4]

Pink team wins: 8 + 4 = 12 points are divided between the two winners
New pink team fame: 86 + 60
New blue team fame: 80 + 45

Blue team wins: 8 + 5 = 13 points are divided between the two winners
New pink team fame: 72 + 49
New blue team fame: 94 + 56


### Two players on each team, unbalanced
pink-team: 99 + 9 [bet size 9 + 1]
blue-team: 100 + 1 [bet size 10 + 0]

Pink team wins: 100 + 0 = 10 points are divided between the two winners
New pink team fame: 100 + 18 (best player could only keep 1 fame, the rest is divide to team mates)
New blue team fame: 90 + 1

Blue team wins: 9 + 1 = 10 points are divided between the two winners
New pink team fame: 90 + 8
New blue team fame: 100 + 11 (best player can keep 0 points, next player gets all)

### Three vs one
pink-team: 81 + 40 + 5 [bet size 8 + 4 + 1]
blue-team: 92 [bet size 9]

Pink team wins: 9 points are divided between three winners
New pink team fame: 84 + 43 + 8
New blue team fame: 83

Blue team wins: 13 to the single winner, HOWEVER, winner can only take 8, 5 fame transfers back to loosers
New pink team fame: 78 + 37 + 3 (3, 3 and 2 are payed)
New blue team fame: 100


## Usage

### `/rate`

Based on game outcome, get new skill

**POST /rate** (`Content-Type: application/json`)

Request body:
```json
{
  "teams": [
    [
      {"id": 13, "fame": 88},
      {"id": 14, "fame": 53}
    ],
    [
      {"id": 37, "fame": 75},
      {"id": 17, "fame": 62}
    ]
  ]
}
```

- Winning team first
- `id` (player ID) is not required, but allowed
- `fame` default: `50`

```json
{
  "teams": [
    [
      {"id": 13, "fame": 94},
      {"id": 14, "fame": 60}
    ],
    [
      {"id": 37, "fame": 62},
      {"id": 17, "fame": 56}
    ]
  ]
}
```

### `/quality`

Based on team composition and skill, give a percentage chance of the first team winning

**POST /quality** (`Content-Type: application/json`)

Request body:
```json
{
  "teams": [
    [
      {"id": 13, "fame": 88},
      {"id": 14, "fame": 53}
    ],
    [
      {"id": 37, "fame": 75},
      {"id": 17, "fame": 62}
    ]
  ]
}
```


Result ((88+53)/(75+62)) (141/(141+137))*100 :

```json
{
  "quality": 50.719
}
```

Your only option for testing stuff atm:

```
npm run dev-start
curl -XPOST 'http://localhost:5000/rate' -H "Content-Type: application/json" -X POST -d '{"teams": [[{"id": 1, "skill": 88},{"id": 2, "skill": 50}],[{"id": 3, "skill": 70},{"id": 4, "skill": 60}]]}'
```

## License

MIT-licensed. See LICENSE.
