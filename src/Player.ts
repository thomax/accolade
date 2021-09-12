import {AccoladeConfig} from './Config'

export interface RawPlayer {
  fame: number
}

export type ExportablePlayer = RawPlayer & {betSize?: number}

function calculateBetSize(fame: number, config: AccoladeConfig) {
  if (fame === config.minFame) {
    return 0
  }
  if (fame < 10) {
    return 1
  }
  return Math.floor((fame * config.betSizePercentage) / 100)
}

export class Player {
  private rawPlayer: RawPlayer
  public fame: number
  public betSize: number
  private config: AccoladeConfig

  constructor(rawPlayer: RawPlayer, config: AccoladeConfig) {
    this.rawPlayer = rawPlayer
    this.fame = rawPlayer.fame || config.initialFame
    this.betSize = calculateBetSize(this.fame, config)
    this.config = config
  }

  adjustFame(amount: number) {
    this.fame = this.fame + amount
  }

  receivePrize() {
    if (this.fame < this.config.maxFame) {
      this.adjustFame(1)
      return 1
    }
    return 0
  }

  receiveOverflow(handoutPassCount: number) {
    const receivedLessThanBetSize = handoutPassCount < this.betSize
    let amountReceived = 0
    if (receivedLessThanBetSize) {
      this.adjustFame(1)
      amountReceived++
    }
    return amountReceived
  }

  export(options: {includeBetSize?: boolean} = {}): ExportablePlayer {
    const player: ExportablePlayer = {...this.rawPlayer, fame: this.fame}
    if (options.includeBetSize) {
      player.betSize = this.betSize
    }
    return player
  }
}
