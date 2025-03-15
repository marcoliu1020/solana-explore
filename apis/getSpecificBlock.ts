import type { Block, Response } from './types'
import { SOLANA_FM_URL } from './urls'

export type SpecificBlockResponse = Response<Block>

export const url = new URL('blocks', SOLANA_FM_URL)

export async function getSpecificBlock(
  blockNumber: string | number,
): Promise<Block> {
  const requestUrl = `${url}/${blockNumber}`
  const res = await fetch(requestUrl)
  const data: SpecificBlockResponse = await res.json()
  return data.result
}
