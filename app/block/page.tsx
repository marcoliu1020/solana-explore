import { BlockDetail } from "@/components/block-detail"
import { notFound } from 'next/navigation'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BlockPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const blockNumber = searchParams.blockNumber
  const blockNumberString = Array.isArray(blockNumber) ? blockNumber[0] : blockNumber

  if (!blockNumberString) {
    notFound()
  }

  return <BlockDetail blockNumber={blockNumberString} />
}

