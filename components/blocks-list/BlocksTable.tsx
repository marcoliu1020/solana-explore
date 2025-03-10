import { Copy } from "lucide-react"
import Link from "next/link"

type BlockTableItem = {
  id: string | number
  hash: string
  transactions: number
  rewards: string | number
  validator: string
  time: string
}

type Props = {
  blocks: BlockTableItem[]
}

export function BlocksTable({ blocks }: Props) {
  return (
    <div className="mt-4 rounded-lg border border-gray-800 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-800">
            <th className="text-left p-4">#</th>
            <th className="text-left p-4">BLOCK HASH</th>
            <th className="text-left p-4">TXS</th>
            <th className="text-left p-4">REWARDS</th>
            <th className="text-left p-4">VALIDATOR</th>
            <th className="text-left p-4">TIME</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => (
            <tr key={block.id} className="border-b border-gray-800/50 bg-gray-900/30 hover:bg-gray-900/50">
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400 cursor-pointer hover:text-indigo-300">{block.id}</span>
                  <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400 cursor-pointer hover:text-indigo-300">{block.hash}</span>
                  <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span>{block.transactions}</span>
                  <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span>{block.rewards}</span>
                  <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-xs">V</div>
                  <span className="text-indigo-400">{block.validator}</span>
                  <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
                </div>
              </td>
              <td className="p-4 text-gray-400">{block.time}</td>
              <td className="p-4">
                <Link href={`/block?blockNumber=${block.id}`}>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md">
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