import assert from 'assert'
import Match from '../src/Match'

const matchOne = {
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


describe('Match', () => {
  describe('#rate()', () => {
    it('should work', () => {
      const match = new Match(matchOne)
      const expected = {

      }
      assert.equal(match.rate(), expected)
    })
    it('works', () => {
      assert.equal(-1, [1,2,3].indexOf(4))
    })
  })
})
