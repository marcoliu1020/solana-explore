"use client"

import { useState } from 'react'
import { Copy, ChevronRight, ChevronLast, Filter } from 'lucide-react'

interface Transaction {
  program: string
  signature: string
  signer: string
  fee: number
}

function TransactionCard({ transaction }: { transaction: Transaction }) {
  return (
    <div className="rounded-lg bg-gray-900/30 p-4 space-y-4">
      <div className="space-y-2">
        <div className="text-sm text-gray-400">PROGRAMS</div>
        <div className="flex items-center gap-2">
          <span className="text-indigo-400">Vote111111...</span>
          <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">TX SIGNATURE</div>
        <div className="flex items-center gap-2">
          <span className="text-indigo-400">4HmeXKz...</span>
          <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">SIGNER</div>
        <div className="flex items-center gap-2">
          <span className="text-indigo-400">dv4ACNkp...</span>
          <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">Fee (SOL):</div>
        <div className="flex items-center gap-2">
          <span className="font-mono">0.00005000</span>
          <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>
    </div>
  )
}

interface TransactionsListProps {
  transactions: Transaction[]
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 2 // This would normally be calculated from total transactions

  // Mock transactions data
  const mockTransactions = Array(10).fill({
    program: 'Vote111111...',
    signature: '4HmeXKz...',
    signer: 'dv4ACNkp...',
    fee: 0.00005000
  })

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg">
          <span className="font-bold">12</span>
          <span className="text-gray-400 ml-2">transactions</span>
        </h2>
        <button className="flex items-center justify-center w-10 h-10 bg-gray-900/50 hover:bg-gray-900 rounded-lg transition-colors">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-3">
        {mockTransactions.map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="rounded-lg border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
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
                      <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">{transaction.signature}</span>
                      <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">{transaction.signer}</span>
                      <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono">
                    <div className="flex items-center justify-end gap-2">
                      <span>{transaction.fee.toFixed(8)}</span>
                      <Copy className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-400 pt-4">
        <div className="flex items-center gap-2">
          <span>Rows Per Page:</span>
          <select 
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-gray-900/30 border border-gray-800 rounded px-2 py-1 text-white outline-none focus:border-indigo-500"
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
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
            >
              <ChevronLast className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

