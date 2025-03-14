'use client'

import { useState } from 'react'
import { Copy, ChevronRight, ChevronLast, Filter } from 'lucide-react'

type Transaction = {
  program: string
  signature: string
  signer: string
  fee: number
}

type TransactionsListProps = {
  transactions: Transaction[]
}

// Mock transactions data
const mockTransactions: Transaction[] = Array(10).fill({
  program: 'Vote111111...',
  signature: '4HmeXKz...',
  signer: 'dv4ACNkp...',
  fee: 0.00005,
})

export function TransactionsList({ transactions = mockTransactions }: TransactionsListProps) {
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 2 // This would normally be calculated from total transactions

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg">
          <span className="font-bold">12</span>
          <span className="ml-2 text-gray-400">transactions</span>
        </h2>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900/50 transition-colors hover:bg-gray-900">
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile View */}
      <div className="space-y-3 lg:hidden">
        {transactions.map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-lg border border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                <th className="p-4">PROGRAMS</th>
                <th className="p-4">TX SIGNATURE</th>
                <th className="p-4">SIGNER</th>
                <th className="p-4 text-right">FEE (SOL)</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-800/50 bg-gray-900/30 hover:bg-gray-900/50">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">{transaction.program}</span>
                      <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">{transaction.signature}</span>
                      <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">{transaction.signer}</span>
                      <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono">
                    <div className="flex items-center justify-end gap-2">
                      <span>{transaction.fee.toFixed(8)}</span>
                      <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 text-sm text-gray-400">
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
            <span>1 of 2</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
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
    </div>
  )
}

function TransactionCard({ transaction }: { transaction: Transaction }) {
  return (
    <div className="space-y-4 rounded-lg bg-gray-900/30 p-4">
      <div className="space-y-2">
        <div className="text-sm text-gray-400">PROGRAMS</div>
        <div className="flex items-center gap-2">
          <span className="text-indigo-400">{transaction.program}</span>
          <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">TX SIGNATURE</div>
        <div className="flex items-center gap-2">
          <span className="text-indigo-400">{transaction.signature}</span>
          <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">SIGNER</div>
        <div className="flex items-center gap-2">
          <span className="text-indigo-400">{transaction.signer}</span>
          <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">Fee (SOL):</div>
        <div className="flex items-center gap-2">
          <span className="font-mono">{transaction.fee.toFixed(8)}</span>
          <Copy className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-300" />
        </div>
      </div>
    </div>
  )
}
