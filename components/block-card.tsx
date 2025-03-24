import CopyClipboard from '@/components/copy-clipboard'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

type BlockItem = {
  blockNumber: number
  hash: string
  transactions: number
  rewards: number
  validator: string
  time: number // unix timestamp (13 digits)
}

type Props = BlockItem & {
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
    <div
      className={cn(
        'space-y-3 rounded-lg border border-gray-800 bg-gray-900/30 p-4',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="text-base font-bold text-gray-400">BLOCK NUMBER</div>
        <div className="text-indigo-400">{blockNumber}</div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">BLOCK HASH</div>
          <div className="flex items-center gap-2">
            <span className="max-w-[8rem] overflow-hidden text-ellipsis text-indigo-400">
              {hash}
            </span>
            <CopyClipboard text={hash} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">TRANSACTIONS</div>
          <div>{transactions}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">REWARDS</div>
          <div>{rewards}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">VALIDATOR</div>
          <div className="flex items-center gap-2">
            <span className="max-w-[8rem] overflow-hidden text-ellipsis text-indigo-400">
              {validator}
            </span>
            <CopyClipboard text={validator} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <Link href={`/block?blockNumber=${blockNumber}`}>
          <button className="cursor-pointer rounded-md bg-indigo-600 px-4 py-1.5 text-white hover:bg-indigo-700">
            View
          </button>
        </Link>
        <div className="text-sm text-gray-400">
          {formatDistanceToNow(new Date(time))}
        </div>
      </div>
    </div>
  )
}
