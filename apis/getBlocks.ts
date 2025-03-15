import type { Block, Response } from './types'
import { SOLANA_FM_URL } from './urls'

export type Blocks = {
  data: Block[]
  pagination: {
    next: number
    previous: number
  }
}

export type BlocksResponse = Response<Blocks>

export const url = new URL('blocks', SOLANA_FM_URL)

export type QueryParams = {
  from?: string // block number
  pageSize?: number
  paginationType?: 'blockNumber' | 'blockTime' // default: blockNumber
  reverse?: boolean // default: false
}

export async function getBlocks(queryParams: QueryParams): Promise<Blocks> {
  const params = new URLSearchParams()

  if (queryParams.from && Number(queryParams.from) > 0)
    params.append('from', queryParams.from)
  if (queryParams.pageSize)
    params.append('pageSize', queryParams.pageSize.toString())
  if (queryParams.paginationType)
    params.append('paginationType', queryParams.paginationType)
  if (queryParams.reverse)
    params.append('reverse', queryParams.reverse.toString())

  const requestUrl = `${url}?${params.toString()}`
  const res = await fetch(requestUrl)
  const data: BlocksResponse = await res.json()

  return data.result
}
