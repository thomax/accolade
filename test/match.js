import assert from 'assert'
import config from '../config/defaultConfig.json'
import Accolade from '../src/index'
const accolade = Accolade(config)

function absoluteFameUnchanged(before, after) {
  let fameBefore = 0
  let fameAfter = 0
  before.teams.forEach(team => {
    team.forEach(player => {
      fameBefore += player.fame
    })
  })
  after.teams.forEach(team => {
    team.forEach(player => {
      fameAfter += player.fame
    })
  })
  return fameBefore === fameAfter
}

describe('Match', () => {
  const simpleCase = {
    teams: [
      [
        { id: 1, fame: 88 }, // 8
        { id: 2, fame: 53 } // 5
      ],
      [
        { id: 3, fame: 75 }, // 7
        { id: 4, fame: 62 } // 6
      ]
    ]
  }
  describe('#rate() simpleCase', () => {
    it('works', () => {
      const match = accolade.createMatch(simpleCase)

      const expected = {
        teams: [
          [
            { id: 1, fame: 94 },
            { id: 2, fame: 60 }
          ],
          [
            { id: 3, fame: 68 },
            { id: 4, fame: 56 }
          ]
        ]
      }
      const result = match.rate()
      assert.strictEqual(absoluteFameUnchanged(simpleCase, result), true)
      assert.deepEqual(result, expected)
    })
  })

  describe('#rate() simpleCase keep incoming keys', () => {

    const simpleCaseKeepKeys = {
      teams: [
        [
          { _id: 1, fame: 88, name: 'foo'  }, // 8
          { _id: 2, fame: 53, name: 'bar'  } // 5
        ],
        [
          { _id: 3, fame: 75, name: 'baz'  }, // 7
          { _id: 4, fame: 62, name: 'bakkabakka'  } // 6
        ]
      ]
    }

    it('works', () => {
      const match = accolade.createMatch(simpleCaseKeepKeys)

      const expected = {
        teams: [
          [
            { _id: 1, fame: 94, name: 'foo' },
            { _id: 2, fame: 60, name: 'bar'  }
          ],
          [
            { _id: 3, fame: 68, name: 'baz'  },
            { _id: 4, fame: 56, name: 'bakkabakka'  }
          ]
        ]
      }
      const result = match.rate()
      assert.strictEqual(absoluteFameUnchanged(simpleCaseKeepKeys, result), true)
      assert.deepEqual(result, expected)
    })
  })

  describe('#rate() bizarreCase keep incoming keys', () => {

    const bizarreCaseKeepKeys = {
      teams: [
        [
          {
            _id: "56bb4d47d7dc1daa74fcd53d",
            mu: 25,
            sigma: 8.333333333333334,
            skill: [
              25,
              8.333333333333334
            ],
            fame: 50
          },
          {
            _id: "56bb4d47d7dc1daa74fcd53e",
            mu: 25,
            sigma: 8.333333333333334,
            skill: [
              25,
              8.333333333333334
            ],
            fame: 50
          }
        ],
        [
          {
            _id: "56bb4d47d7dc1daa74fcd53f",
            mu: 25,
            sigma: 8.333333333333334,
            skill: [
              25,
              8.333333333333334
            ],
            fame: 50
          },
          {
            _id: "56bb4d47d7dc1daa74fcd540",
            mu: 25,
            sigma: 8.333333333333334,
            skill: [
              25,
              8.333333333333334
            ],
            fame: 50
          }
        ]
      ]
    }

    it('works', () => {
      const match = accolade.createMatch(bizarreCaseKeepKeys)

      const expected = {
        teams: [
          [
            {
              _id: "56bb4d47d7dc1daa74fcd53d",
              mu: 25,
              sigma: 8.333333333333334,
              skill: [
                25,
                8.333333333333334
              ],
              fame: 55
            },
            {
              _id: "56bb4d47d7dc1daa74fcd53e",
              mu: 25,
              sigma: 8.333333333333334,
              skill: [
                25,
                8.333333333333334
              ],
              fame: 55
            }
          ],
          [
            {
              _id: "56bb4d47d7dc1daa74fcd53f",
              mu: 25,
              sigma: 8.333333333333334,
              skill: [
                25,
                8.333333333333334
              ],
              fame: 45
            },
            {
              _id: "56bb4d47d7dc1daa74fcd540",
              mu: 25,
              sigma: 8.333333333333334,
              skill: [
                25,
                8.333333333333334
              ],
              fame: 45
            }
          ]
        ]
      }
      const result = match.rate()
      assert.strictEqual(absoluteFameUnchanged(bizarreCaseKeepKeys, result), true)
      assert.deepEqual(result, expected)
    })
  })

  const oneWinnerMaxesOut = {
    teams: [
      [
        { id: 1, fame: 98 }, // 9
        { id: 2, fame: 53 } // 5
      ],
      [
        { id: 3, fame: 75 }, // 7
        { id: 4, fame: 62 } // 6
      ]
    ]
  }
  describe('#rate() oneWinnerMaxesOut', () => {
    it('works', () => {
      const match = accolade.createMatch(oneWinnerMaxesOut)
      const expected = {
        teams: [
          [{ id: 1, fame: 100 }, { id: 2, fame: 64 }],
          [{ id: 3, fame: 68 }, { id: 4, fame: 56 }]
        ]
      }
      const result = match.rate()
      assert.strictEqual(
        absoluteFameUnchanged(oneWinnerMaxesOut, result),
        true
      )
      assert.deepEqual(result, expected)
    })
  })

  const bothWinnersMaxOut = {
    teams: [
      [
        { id: 1, fame: 98 }, // 9
        { id: 2, fame: 97 } // 9
      ],
      [
        { id: 3, fame: 75 }, // 7
        { id: 4, fame: 62 } // 6
      ]
    ]
  }
  describe('#rate() bothWinnersMaxOut', () => {
    it('works', () => {
      const match = accolade.createMatch(bothWinnersMaxOut)
      const expected = {
        teams: [
          [
            { id: 1, fame: 100 },
            { id: 2, fame: 100 }
          ],
          [
            { id: 3, fame: 72 },
            { id: 4, fame: 60 }
          ]
        ]
      }
      const result = match.rate()
      assert.strictEqual(
        absoluteFameUnchanged(bothWinnersMaxOut, result),
        true
      )
      assert.deepEqual(result, expected)
    })
  })

  const oneVsTwo = {
    teams: [
      [
        { id: 1, fame: 60 } // 6
      ],
      [
        { id: 3, fame: 75 }, // 7
        { id: 4, fame: 62 } // 6
      ]
    ]
  }
  describe('#rate() oneVsTwo', () => {
    it('works', () => {
      const match = accolade.createMatch(oneVsTwo)
      const expected = {
        teams: [
          [
            { id: 1, fame: 73 }
          ],
          [
            { id: 3, fame: 68 },
            { id: 4, fame: 56 }
          ]
        ]
      }
      const result = match.rate()
      assert.strictEqual(absoluteFameUnchanged(oneVsTwo, result), true)
      assert.deepEqual(result, expected)
    })
  })

  const twoVsOne = {
    teams: [
      [
        { id: 1, fame: 60 }, // 6
        { id: 2, fame: 50 } // 5
      ],
      [
        { id: 3, fame: 73 } // 7
      ]
    ]
  }
  describe('#rate() twoVsOne', () => {
    it('works', () => {
      const match = accolade.createMatch(twoVsOne)
      const expected = {
        teams: [
          [
            { id: 1, fame: 63 },
            { id: 2, fame: 54 }
          ],
          [
            { id: 3, fame: 66 }
          ]
        ]
      }
      const result = match.rate()
      assert.strictEqual(absoluteFameUnchanged(twoVsOne, result), true)
      assert.deepEqual(result, expected)
    })
  })

  const oneVsOneOverflow = {
    teams: [
      [
        { id: 1, fame: 99 }, // 9
      ],
      [
        { id: 2, fame: 50 } // 5
      ]
    ]
  }
  describe('#rate() oneVsOneOverflow', () => {
    it('works', () => {
      const match = accolade.createMatch(oneVsOneOverflow)
      const expected = {
        teams: [
          [
            { id: 1, fame: 100 }
          ],
          [
            { id: 2, fame: 49 }
          ]
        ]
      }
      const result = match.rate()
      assert.strictEqual(absoluteFameUnchanged(oneVsOneOverflow, result), true)
      assert.deepEqual(result, expected)
    })
  })


  const unbalancedOne = {
    teams: [
      [
        { id: 1, fame: 99 }, // 9
        { id: 2, fame: 80 } // 8
      ],
      [
        { id: 3, fame: 1 }, // 0
        { id: 4, fame: 2 } // 1
      ]
    ]
  }
  describe('#rate() unbalancedOne', () => {
    it('works', () => {
      const match = accolade.createMatch(unbalancedOne)
      const expected = {
        teams: [
          [
            { id: 1, fame: 99 },
            { id: 2, fame: 81 }
          ],
          [
            { id: 3, fame: 1 },
            { id: 4, fame: 1 }
          ]
        ]
      }
      const result = match.rate()
      assert.strictEqual(absoluteFameUnchanged(unbalancedOne, result), true)
      assert.deepEqual(result, expected)
    })
  })

  const unbalancedTwo = {
    teams: [
      [
        { id: 1, fame: 100 }, // 10
        { id: 2, fame: 8 } // 1
      ],
      [
        { id: 3, fame: 1 }, // 0
        { id: 4, fame: 2 }, // 1
        { id: 5, fame: 19 }, // 1
        { id: 6, fame: 22 } // 2
      ]
    ]
  }
  describe('#rate() unbalancedTwo', () => {
    it('works', () => {
      const match = accolade.createMatch(unbalancedTwo)
      const expected = {
        teams: [
          [
            { id: 1, fame: 100 },
            { id: 2, fame: 12 }
          ],
          [
            { id: 3, fame: 1 },
            { id: 4, fame: 1 },
            { id: 5, fame: 18 },
            { id: 6, fame: 20 }
          ]
        ]
      }
      const result = match.rate()
      assert.strictEqual(absoluteFameUnchanged(unbalancedTwo, result), true)
      assert.deepEqual(result, expected)
    })
  })

  const betPreservation = {
    teams: [
      [
        { id: 1, fame: 100 }, // 10
        { id: 2, fame: 95 } // 9
      ],
      [
        { id: 3, fame: 80 }, // 8
        { id: 4, fame: 2 }, // 1
      ]
    ]
  }
  describe('#rate() betPreservation', () => {
    it('works', () => {
      const match = accolade.createMatch(betPreservation)
      const expected = {
        teams: [
          [
            { id: 1, fame: 100 },
            { id: 2, fame: 100 }
          ],
          [
            { id: 3, fame: 75 },
            { id: 4, fame: 2 }
          ]
        ]
      }
      const result = match.rate()
      assert.strictEqual(absoluteFameUnchanged(betPreservation, result), true)
      assert.deepEqual(result, expected)
    })
  })

  describe('#quality() simpleCase', () => {
    it('works', () => {
      const match = accolade.createMatch(simpleCase)
      const expected = {
        quality: 50.719424460431654,
        teams: [
          [
            { id: 1, fame: 88, betSize: 8 },
            { id: 2, fame: 53, betSize: 5 }
          ],
          [
            { id: 3, fame: 75, betSize: 7 },
            { id: 4, fame: 62, betSize: 6 }
          ]
        ]
      }
      const result = match.quality()
      assert.deepEqual(result, expected)
    })
  })

})
