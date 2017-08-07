/* eslint-disable no-console */

import {betSizePercentage} from '../config/app.json'

class Player {

  //   {"id": 14, "fame": 53}
  constructor(rawPlayer) {
    this.fame = rawPlayer.fame
    this.betSize = Math.floor(this.fame * betSizePercentage / 100)
  }

  adjustForDefeat() {

  }

  adjustForVictory() {

  }

}

export default Player

/* eslint-enable no-console */
