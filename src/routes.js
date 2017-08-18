import express from 'express'
import Match from './Match'
const router = express()

router.get('/', (req, res) => {
  res.send('Accolade sez hello')
})

router.post('/rate', (req, res) => {
  const match = new Match(req.body)
  const result = match.rate()
  res.status(200).type('application/json').send(JSON.stringify(result, null, 2))
})

router.post('/quality', (req, res) => {
  const match = new Match(req.body)
  const result = {
    quality: match.quality(),
    teams: match.teams.map(item => {
      return item.team.map(player => {
        return {id: player.id, fame: player.fame, betSize: player.betSize}
      })
    })
  }
  res.status(200).type('application/json').send(JSON.stringify(result, null, 2))
})

module.exports = router
