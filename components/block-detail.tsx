"use client"

import { Copy, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { TransactionsList } from "./transactions-list"
import { RewardsList } from "./rewards-list"

interface BlockDetailProps {
  blockNumber: string
}

export function BlockDetail({ blockNumber }: BlockDetailProps) {
  // This would normally come from an API
  const blockData = {
    number: "322,250,699",
    hash: "BgNpEJQ8eVx1s67G2DkqT7CDiuCdCpJmwqTmTGsjd74D",
    leader: "dv4ACNkpYPcE3aKmYDqZm9G5EB3J4MRoeE7WNDRBVJB",
    parentBlock: "322250698",
    parentBlockHash: "8N3HzXuZwHEB8kbMCrobGskFjn6ySAPqqiP4M8cSCa51",
    epoch: "745",
    transactions: {
      count: 12,
      successRate: "100.00%",
    },
    createdOn: "August 29, 2024 12:42:55 UTC",
    confirmations: "Finalised",
    rewards: {
      amount: "0.00003000",
      usd: "0.0043",
    },
  }

  const prevBlockNumber = Number.parseInt(blockNumber) - 1
  const nextBlockNumber = Number.parseInt(blockNumber) + 1

  return (
    <div className="min-h-screen bg-black text-white p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Block Icon"
              width={48}
              height={48}
              className="hidden sm:block"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{blockData.number}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-400 break-all">{blockData.hash}</span>
                <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300 shrink-0" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/block?blockNumber=${prevBlockNumber}`}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <Link
              href={`/block?blockNumber=${nextBlockNumber}`}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-900/30 p-4">
            <div className="text-sm text-gray-400 mb-2">LEADER</div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 break-all">{blockData.leader}</span>
              <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300 shrink-0" />
            </div>
          </div>

          <div className="rounded-lg bg-gray-900/30 p-4">
            <div className="text-sm text-gray-400 mb-2">PARENT BLOCK</div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-400">{blockData.parentBlock}</span>
              <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300 shrink-0" />
            </div>
          </div>

          <div className="rounded-lg bg-gray-900/30 p-4">
            <div className="text-sm text-gray-400 mb-2">PARENT BLOCKHASH</div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 break-all">{blockData.parentBlockHash}</span>
              <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300 shrink-0" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="rounded-lg bg-gray-900/30 p-4 space-y-4">
          <div>
            <div className="text-sm text-gray-400 mb-2">EPOCH</div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-400">{blockData.epoch}</span>
              <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-2">TRANSACTIONS</div>
            <div>
              {blockData.transactions.count} ({blockData.transactions.successRate} Successful)
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-2">CREATED ON</div>
            <div>{blockData.createdOn}</div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-2">CONFIRMATIONS</div>
            <div className="flex items-center gap-2">
              <span>{blockData.confirmations}</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-2">REWARDS</div>
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
        <h2 className="text-lg font-bold mb-4">Rewards</h2>
        <RewardsList
          rewards={[
            {
              type: "Fee",
              address: "dv4ACNkpYPcE3aKmYDqZm9G5EB3J4MRoeE7WNDRBVJB",
              amount: 0.00003,
            },
            {
              type: "Rent",
              address: "HP3bDMfsL15nGGbQHJPjRpSs69WyGwrVBWs23VBqEAoN",
              amount: -0.00000046,
            },
            {
              type: "Rent",
              address: "dv3qDFk1DTF36Z62bNvrCXe9sKATA6xvVy6A798xxAS",
              amount: 0.000000012,
            },
          ]}
        />
      </div>
    </div>
  )
}

