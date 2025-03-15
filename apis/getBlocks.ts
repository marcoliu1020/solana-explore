import { SOLANA_FM_URL } from './urls'

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

export type Blocks = {
  data: Block[]
  pagination: {
    next: number
    previous: number
  }
}

export const url = new URL('blocks', SOLANA_FM_URL)

export type QueryParams = {
  from?: string // block number
  pageSize?: number
  paginationType?: 'blockNumber' | 'blockTime' // default: blockNumber
  reverse?: boolean // default: false
}

export async function getBlocks(queryParams: QueryParams): Promise<Blocks> {
  const searchParams = new URLSearchParams()

  if (queryParams.from && Number(queryParams.from) > 0)
    searchParams.append('from', queryParams.from)
  if (queryParams.pageSize)
    searchParams.append('pageSize', queryParams.pageSize.toString())
  if (queryParams.paginationType)
    searchParams.append('paginationType', queryParams.paginationType)
  if (queryParams.reverse)
    searchParams.append('reverse', queryParams.reverse.toString())

  const requestUrl = `${url}?${searchParams.toString()}`
  const res = await fetch(requestUrl)
  const data = await res.json()

  return data.result
}
