import { Connection } from '@solana/web3.js'

const solana = new Connection('https://api.mainnet-beta.solana.com')

export const getBlock = async (blockNumber: number) => {
  const block = await solana.getBlock(blockNumber, {
    maxSupportedTransactionVersion: 0,
  })
  return block
}
