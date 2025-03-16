import { getBlock } from '@/apis/solana-rpc/getBlock'
import { BlockDetail } from '@/components/block-detail'
import PageTitle from '@/components/page-title'
import { toSolanaAmount } from '@/lib/utils'
import { notFound } from 'next/navigation'

type SearchParams = Promise<{
  blockNumber?: string
}>

export default async function BlockPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const blockNumber = Number(searchParams?.blockNumber)

  if (!blockNumber || isNaN(blockNumber) || blockNumber < 1) {
    notFound()
  }

  const block = await getBlock(blockNumber)
  console.log(block)

  if (!block) notFound()
  return (
    <>
      <main className="p-4">
        <PageTitle title="Overview" />
        <BlockDetail
          blockNumber={blockNumber}
          timestamp={block?.blockTime ?? 0}
          blockHash={block?.blockhash ?? ''}
          leader={block?.rewards?.[0]?.pubkey ?? ''}
          rewardInSol={toSolanaAmount(block?.rewards?.[0]?.lamports ?? 0)}
          transactions={block?.transactions?.length ?? 0}
          previousBlock={block?.previousBlockhash ?? ''}
        />
      </main>
    </>
  )
}
