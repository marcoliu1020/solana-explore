import { getBlock } from '@/apis/solana-rpc/getBlock'
import BlockDetail from '@/components/block-detail'
import PageTitle from '@/components/page-title'
import TransactionsTable from '@/components/transactions-list'
import { toSolanaAmount } from '@/lib/utils'
import { notFound } from 'next/navigation'

type SearchParams = Promise<{
  blockNumber?: string
}>

export default async function BlockPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const blockNumber = Number(searchParams?.blockNumber)

  // check if block number is valid
  if (!blockNumber || isNaN(blockNumber) || blockNumber < 1) {
    notFound()
  }

  // get block details
  const block = await getBlock(blockNumber)
  if (!block) notFound()
  console.log(block)

  // transactions dto
  const transactions =
    block.transactions.map((tx) => ({
      signature: tx.transaction.signatures[0],
      signer: tx.transaction.message.staticAccountKeys[0].toString(),
      fee: toSolanaAmount(tx.meta?.fee ?? 0),
    })) ?? []

  return (
    <>
      <main className="mx-auto max-w-screen-lg p-4">
        <>
          <PageTitle title="Block Details" />
          <BlockDetail
            className="mt-2"
            blockNumber={blockNumber}
            timestamp={block?.blockTime ?? 0}
            blockHash={block?.blockhash ?? ''}
            leader={block?.rewards?.[0]?.pubkey ?? ''}
            rewardInSol={toSolanaAmount(block?.rewards?.[0]?.lamports ?? 0)}
            transactions={block?.transactions?.length ?? 0}
            previousBlock={block?.previousBlockhash ?? ''}
          />
        </>

        <>
          <PageTitle className="mt-4" title="Transactions" />
          <TransactionsTable className="mt-2" transactions={transactions} />
        </>
      </main>
    </>
  )
}
