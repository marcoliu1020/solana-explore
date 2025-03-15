import { getSpecificBlock } from '@/apis/getSpecificBlock'
import { BlockDetail } from '@/components/block-detail'
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
      <h2 className="text-2xl font-bold">Overview</h2>
      <BlockDetail block={block} />
    </>
  )
}
