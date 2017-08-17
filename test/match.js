import assert from 'assert'
import Match from '../src/Match'

describe('Match', () => {

  const simpleCase = {
    teams: [
      [
        {id: 1, fame: 88}, // 8
        {id: 2, fame: 53} // 5
      ],
      [
        {id: 3, fame: 75}, // 7
        {id: 4, fame: 62} // 6
      ]
    ]
  }
  describe('#rate() simpleCase', () => {
    it('works', () => {
      const match = new Match(simpleCase)
      const expected = {
        teams: [
          [
            {id: 1, fame: 94},
            {id: 2, fame: 60}
          ],
          [
            {id: 3, fame: 68},
            {id: 4, fame: 56}
          ]
        ]
      }
      const result = match.rate()
      assert.deepEqual(result, expected)
    })
  })


  const oneWinnerMaxesOut = {
    teams: [
      [
        {id: 1, fame: 98}, // 9
        {id: 2, fame: 53} // 5
      ],
      [
        {id: 3, fame: 75}, // 7
        {id: 4, fame: 62} // 6
      ]
    ]
  }
  describe('#rate() oneWinnerMaxesOut', () => {
    it('works', () => {
      const match = new Match(oneWinnerMaxesOut)
      const expected = {
        teams: [
          [
            {id: 1, fame: 100},
            {id: 2, fame: 64}
          ],
          [
            {id: 3, fame: 68},
            {id: 4, fame: 56}
          ]
        ]
      }
      const result = match.rate()
      assert.deepEqual(result, expected)
    })
  })


  const bothWinnersMaxOut = {
    teams: [
      [
        {id: 1, fame: 98}, // 9
        {id: 2, fame: 97} // 9
      ],
      [
        {id: 3, fame: 75}, // 7
        {id: 4, fame: 62} // 6
      ]
    ]
  }
  describe('#rate() bothWinnersMaxOut', () => {
    it('works', () => {
      const match = new Match(bothWinnersMaxOut)
      const expected = {
        teams: [
          [
            {id: 1, fame: 100},
            {id: 2, fame: 100}
          ],
          [
            {id: 3, fame: 72},
            {id: 4, fame: 60}
          ]
        ]
      }
      const result = match.rate()
      //assert.equal(result, expected)
      assert.deepEqual(result, expected)
    })
  })
})
