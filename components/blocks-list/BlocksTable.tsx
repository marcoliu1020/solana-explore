import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { Copy } from 'lucide-react'
import Link from 'next/link'

export type BlockItem = {
  blockNumber: number
  hash: string
  transactions: number
  rewards: number
  validator: string
  time: number // unix timestamp (13 digits)
}

type Props = {
  blocks: BlockItem[]
  className?: string
}

export function BlocksTable({ blocks, className }: Props) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-gray-800',
        className,
      )}
    >
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800 text-sm text-gray-400">
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">BLOCK HASH</th>
            <th className="p-4 text-left">TXS</th>
            <th className="p-4 text-left">REWARDS</th>
            <th className="p-4 text-left">VALIDATOR</th>
            <th className="p-4 text-left">TIME</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => (
            <tr
              key={block.blockNumber}
              className="border-b border-gray-800/50 bg-gray-900/30 hover:bg-gray-900/50"
            >
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="cursor-pointer text-indigo-400 hover:text-indigo-300">
                    {block.blockNumber}
                  </span>
                  <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="max-w-[8rem] overflow-hidden text-ellipsis text-indigo-400">
                    {block.hash}
                  </span>
                  <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span>{block.transactions}</span>
                  <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span>{block.rewards}</span>
                  <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-xs">
                    V
                  </div>
                  <span className="max-w-[8rem] overflow-hidden text-ellipsis text-indigo-400">
                    {block.validator}
                  </span>
                  <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
                </div>
              </td>
              <td className="p-4 text-gray-400">
                {formatDistanceToNow(new Date(block.time))} ago
              </td>
              <td className="p-4">
                <Link href={`/block?blockNumber=${block.blockNumber}`}>
                  <button className="rounded-md bg-indigo-600 px-4 py-1.5 text-white hover:bg-indigo-700">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
