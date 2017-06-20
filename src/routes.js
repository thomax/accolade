import express from 'express'
const router = express()

router.get('/sup', (req, res) => {
   res.send('sup?')
})

router.post('/rate', (req, res) => {
  var teams = req.body.teams
  res.status(200).type('application/json').send(JSON.stringify(teams, null, 2))
})

// app.post('/:target', function (req, res) {
//   var targetName = req.params.target.split(':')[0]
//   var token = req.params.target.split(':')[1]
//   var string = req.body.string
//   if (string.length > 512) {
//     return res.status(400).send('String cannot exceed 512 characters')
//   }
//   data.appendString(targetName, token, string, function(result) {
//     if (result === false) {
//       return res.status(403).send('Token mismatch')
//     }
//     res.type('application/json').status(201).send(result)
//   })
// })

module.exports = router
