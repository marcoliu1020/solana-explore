import { clusterApiUrl, Connection } from '@solana/web3.js'

const solana = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed')

export const isBlockHashValid = async (blockHash: string) => {
  const block = await solana.isBlockhashValid(blockHash)
  return block
}
