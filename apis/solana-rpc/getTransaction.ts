import { clusterApiUrl, Connection } from '@solana/web3.js'

const solana = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed')

export const getTransaction = async (transactionSignature: string) => {
  const transaction = await solana.getTransaction(transactionSignature, {
    maxSupportedTransactionVersion: 0,
  })
  return transaction
}
