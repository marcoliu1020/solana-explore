'use client'

import { cn } from '@/lib/utils'
import { ChevronLast, ChevronRight, Copy } from 'lucide-react'
import { useState } from 'react'

interface Reward {
  type: 'Rent' | 'Fee'
  address: string
  amount: number
}

interface RewardsListProps {
  rewards: Reward[]
  totalPages?: number
}

export function RewardsList({ rewards, totalPages = 1 }: RewardsListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
      <div className="border-b border-gray-800 p-4">
        <h2 className="text-lg font-medium">Rewards breakdown</h2>
      </div>

      <div className="divide-y divide-gray-800">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className="flex flex-col p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="mb-2 flex items-center gap-3 sm:mb-0">
              <span
                className={cn(
                  'rounded-md px-2 py-1 text-xs font-medium',
                  reward.type === 'Rent'
                    ? 'bg-amber-950 text-amber-500'
                    : 'bg-blue-950 text-blue-500',
                )}
              >
                {reward.type}
              </span>
              <div className="flex max-w-[200px] items-center gap-1 truncate text-sm text-indigo-400 sm:max-w-[300px] sm:text-base lg:max-w-[500px]">
                <span className="truncate">{reward.address}</span>
                <button className="shrink-0">
                  <Copy className="h-4 w-4 text-gray-500 hover:text-gray-300" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1">
              <button className="shrink-0">
                <Copy className="h-4 w-4 text-gray-500 hover:text-gray-300" />
              </button>
              <span
                className={cn(
                  'font-mono text-sm',
                  reward.amount < 0 ? 'text-red-500' : 'text-green-500',
                )}
              >
                {reward.amount.toFixed(
                  reward.amount < 0.0001 && reward.amount > -0.0001 ? 10 : 5,
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-800 p-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>Rows Per Page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="rounded border border-gray-800 bg-gray-900/30 px-2 py-1 text-white outline-none focus:border-indigo-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
              >
                <ChevronLast className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
