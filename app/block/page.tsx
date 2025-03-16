import { getSpecificBlock } from '@/apis/getSpecificBlock'
import { BlockDetail } from '@/components/block-detail'
import PageTitle from '@/components/page-title'
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

  const block = await getSpecificBlock(blockNumber)
  console.log(block)

  if (!block) notFound()
  return (
    <>
      <main className="p-4">
        <PageTitle title="Overview" />
        <BlockDetail block={block} />
      </main>
    </>
  )
}
