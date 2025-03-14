'use client'

import { RewardsList } from '@/components/rewards-list'
import { TransactionsList } from '@/components/transactions-list'
import { mockBlockDetail } from '@/data/block-detail'
import { CheckCircle2, ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface BlockDetailProps {
  blockNumber: string
}

export function BlockDetail({ blockNumber }: BlockDetailProps) {
  const blockData = mockBlockDetail

  const prevBlockNumber = Number.parseInt(blockNumber) - 1
  const nextBlockNumber = Number.parseInt(blockNumber) + 1

  return (
    <div className="min-h-screen bg-black p-4 text-white lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Block Icon"
              width={48}
              height={48}
              className="hidden sm:block"
            />
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{blockData.number}</h1>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm break-all text-gray-400">{blockData.hash}</span>
                <Copy className="h-4 w-4 shrink-0 cursor-pointer text-gray-500 hover:text-gray-300" />
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/block?blockNumber=${prevBlockNumber}`}
              className="rounded-lg p-2 transition-colors hover:bg-gray-800"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Link
              href={`/block?blockNumber=${nextBlockNumber}`}
              className="rounded-lg p-2 transition-colors hover:bg-gray-800"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-900/30 p-4">
            <div className="mb-2 text-sm text-gray-400">LEADER</div>
            <div className="flex items-center gap-2">
              <span className="break-all text-indigo-400">{blockData.leader}</span>
              <Copy className="h-4 w-4 shrink-0 cursor-pointer text-gray-500 hover:text-gray-300" />
            </div>
          </div>

          <div className="rounded-lg bg-gray-900/30 p-4">
            <div className="mb-2 text-sm text-gray-400">PARENT BLOCK</div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-400">{blockData.parentBlock}</span>
              <Copy className="h-4 w-4 shrink-0 cursor-pointer text-gray-500 hover:text-gray-300" />
            </div>
          </div>

          <div className="rounded-lg bg-gray-900/30 p-4">
            <div className="mb-2 text-sm text-gray-400">PARENT BLOCKHASH</div>
            <div className="flex items-center gap-2">
              <span className="break-all text-indigo-400">{blockData.parentBlockHash}</span>
              <Copy className="h-4 w-4 shrink-0 cursor-pointer text-gray-500 hover:text-gray-300" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 rounded-lg bg-gray-900/30 p-4">
          <div>
            <div className="mb-2 text-sm text-gray-400">EPOCH</div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-400">{blockData.epoch}</span>
              <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm text-gray-400">TRANSACTIONS</div>
            <div>
              {blockData.transactions.count} ({blockData.transactions.successRate} Successful)
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm text-gray-400">CREATED ON</div>
            <div>{blockData.createdOn}</div>
          </div>

          <div>
            <div className="mb-2 text-sm text-gray-400">CONFIRMATIONS</div>
            <div className="flex items-center gap-2">
              <span>{blockData.confirmations}</span>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm text-gray-400">REWARDS</div>
            <div>
              Ø{blockData.rewards.amount} (USD${blockData.rewards.usd})
            </div>
          </div>
        </div>
      </div>

      {/* Add TransactionsList below the grid */}
      <TransactionsList transactions={[]} />
      {/* Rewards List */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Rewards</h2>
        <RewardsList
          rewards={[
            {
              type: 'Fee',
              address: 'dv4ACNkpYPcE3aKmYDqZm9G5EB3J4MRoeE7WNDRBVJB',
              amount: 0.00003,
            },
            {
              type: 'Rent',
              address: 'HP3bDMfsL15nGGbQHJPjRpSs69WyGwrVBWs23VBqEAoN',
              amount: -0.00000046,
            },
            {
              type: 'Rent',
              address: 'dv3qDFk1DTF36Z62bNvrCXe9sKATA6xvVy6A798xxAS',
              amount: 0.000000012,
            },
          ]}
        />
      </div>
    </div>
  )
}
