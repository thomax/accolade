export interface AccoladeConfig {
  betSizePercentage: number
  maxFame: number
  minFame: number
  initialFame: number
}

export const defaultConfig: AccoladeConfig = {
  betSizePercentage: 10,
  maxFame: 100,
  minFame: 1,
  initialFame: 50,
}
