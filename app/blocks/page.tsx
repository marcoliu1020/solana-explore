import BlocksList from "@/components/blocks-list"
import { getBlocks } from "@/data/blocks"

export default function BlocksPage() {
  const blocks = getBlocks()
  return <BlocksList blocks={blocks} />
} 