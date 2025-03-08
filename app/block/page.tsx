import { BlockDetail } from "@/components/block-detail"

interface PageProps {
  searchParams: { blockNumber?: string }
}

export default function Page({ searchParams }: PageProps) {
  const blockNumber = searchParams.blockNumber || "0"

  return <BlockDetail blockNumber={blockNumber} />
}

