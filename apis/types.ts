export type Response<T> = {
  status: string
  message: string
  result: T
}

export type Block = {
  blockNumber: number
  data: {
    blockTime: number
    dataSize: number
    epoch: number
    hash: string
    number: number
    numberOfRewards: number
    numberOfTransactions: number
    parentNumber: number
    previousHash: string
    producer: string
    successfulTransactions: number
    totalComputeUnitsConsumed: number
    totalComputeUnitsLimit: number
    totalRewardAmount: number
    totalTxFees: number
    voteTransactions: number
  }
}
