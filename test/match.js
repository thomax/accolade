import assert from "assert"
import Match from "../src/Match"

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

describe("Match", () => {
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
  describe("#rate() simpleCase", () => {
    it("works", () => {
      const match = new Match(simpleCase)
      const expected = {
        teams: [
          [{ id: 1, fame: 94 }, { id: 2, fame: 60 }],
          [{ id: 3, fame: 68 }, { id: 4, fame: 56 }]
        ]
      }
      const result = match.rate()
      assert.strictEqual(absoluteFameUnchanged(simpleCase, expected), true)
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
  describe("#rate() oneWinnerMaxesOut", () => {
    it("works", () => {
      const match = new Match(oneWinnerMaxesOut)
      const expected = {
        teams: [
          [{ id: 1, fame: 100 }, { id: 2, fame: 64 }],
          [{ id: 3, fame: 68 }, { id: 4, fame: 56 }]
        ]
      }
      const result = match.rate()
      assert.strictEqual(
        absoluteFameUnchanged(oneWinnerMaxesOut, expected),
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
  describe("#rate() bothWinnersMaxOut", () => {
    it("works", () => {
      const match = new Match(bothWinnersMaxOut)
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
        absoluteFameUnchanged(bothWinnersMaxOut, expected),
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
  describe("#rate() oneVsTwo", () => {
    it("works", () => {
      const match = new Match(oneVsTwo)
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
      assert.strictEqual(absoluteFameUnchanged(oneVsTwo, expected), true)
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
  describe("#rate() twoVsOne", () => {
    it("works", () => {
      const match = new Match(twoVsOne)
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
      assert.strictEqual(absoluteFameUnchanged(twoVsOne, expected), true)
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
  describe("#rate() oneVsOneOverflow", () => {
    it("works", () => {
      const match = new Match(oneVsOneOverflow)
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
      assert.strictEqual(absoluteFameUnchanged(oneVsOneOverflow, expected), true)
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
  describe("#rate() unbalancedOne", () => {
    it("works", () => {
      const match = new Match(unbalancedOne)
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
      assert.strictEqual(absoluteFameUnchanged(unbalancedOne, expected), true)
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
  describe("#rate() unbalancedTwo", () => {
    it("works", () => {
      const match = new Match(unbalancedTwo)
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
      assert.strictEqual(absoluteFameUnchanged(unbalancedTwo, expected), true)
      assert.deepEqual(result, expected)
    })
  })

  const betPreservationOne = {
    teams: [
      [
        { id: 1, fame: 100 }, // 10
        { id: 2, fame: 99 } // 9
      ],
      [
        { id: 3, fame: 80 }, // 8
        { id: 4, fame: 2 }, // 1
      ]
    ]
  }
  describe("#rate() betPreservationOne", () => {
    it.only("works", () => {
      const match = new Match(betPreservationOne)
      const expected = {
        teams: [
          [
            { id: 1, fame: 100 },
            { id: 2, fame: 99 }
          ],
          [
            { id: 3, fame: 79 },
            { id: 4, fame: 2 }
          ]
        ]
      }
      const result = match.rate()
      //assert.strictEqual(absoluteFameUnchanged(betPreservationOne, expected), true)
      assert.equal(result, expected)
    })
  })

})
