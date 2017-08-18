import express from 'express'
const router = express()
import Match from './Match'

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
    quality: match.quality()
  }
  res.status(200).type('application/json').send(JSON.stringify(result, null, 2))
})

module.exports = router
