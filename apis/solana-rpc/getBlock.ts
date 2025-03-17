import { clusterApiUrl, Connection } from '@solana/web3.js'

const solana = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed')

export const getBlock = async (blockNumber: number) => {
  const block = await solana.getBlock(blockNumber, {
    maxSupportedTransactionVersion: 0,
  })
  return block
}
