import { Copy } from "lucide-react"
import Link from "next/link"

type BlockCardItem = {
  id: string | number
  hash: string
  transactions: number
  rewards: string | number
  validator: string
  time: string
}

type Props = {
  block: BlockCardItem
}

export function BlockCard({ block }: Props) {
  return (
    <div className="rounded-lg bg-gray-900/30 p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-base text-gray-400">BLOCK</div>
        <div className="text-indigo-400">{block.id}</div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">BLOCK HASH</div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-400">{block.hash}</span>
            <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">TRANSACTIONS</div>
          <div>{block.transactions}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">REWARDS</div>
          <div>{block.rewards}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">VALIDATOR</div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-400">{block.validator}</span>
            <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-1">
        <Link href={`/block?blockNumber=${block.id}`}>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md">View</button>
        </Link>
        <div className="text-sm text-gray-400">{block.time}</div>
      </div>
    </div>
  )
} 