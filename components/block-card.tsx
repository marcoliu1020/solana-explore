import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { Copy } from "lucide-react"
import Link from "next/link"

type Props = {
  blockNumber: number
  hash: string
  transactions: number
  rewards: number
  validator: string
  time: number // unix timestamp (13 digits)
  className?: string
}

export function BlockCard({
  blockNumber,
  hash,
  transactions,
  rewards,
  validator,
  time,
  className,
}: Props) {
  return (
    <div className={cn("rounded-lg bg-gray-900/30 border border-gray-800 p-4 space-y-3", className)}>
      <div className="flex justify-between items-center">
        <div className="text-base font-bold text-gray-400">BLOCK NUMBER</div>
        <div className="text-indigo-400">{blockNumber}</div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">BLOCK HASH</div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 text-ellipsis overflow-hidden max-w-[8rem]">{hash}</span>
            <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">TRANSACTIONS</div>
          <div>{transactions}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">REWARDS</div>
          <div>{rewards}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">VALIDATOR</div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 text-ellipsis overflow-hidden max-w-[8rem]">{validator}</span>
            <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-1">
        <Link href={`/block?blockNumber=${blockNumber}`}>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md">View</button>
        </Link>
        <div className="text-sm text-gray-400">{formatDistanceToNow(new Date(time))}</div>
      </div>
    </div>
  )
}
