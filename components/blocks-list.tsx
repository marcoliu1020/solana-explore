"use client"

import { useState } from "react"
import Link from "next/link"
import { Copy, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react"
import type { Block } from "@/data/blocks"

interface BlockCardProps {
  block: Block
}

function BlockCard({ block }: BlockCardProps) {
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

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

function Pagination({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }: PaginationProps) {
  const pageSizeOptions = [20, 50, 100]

  return (
    <div className="flex items-center justify-between text-sm text-gray-400 pt-4">
      <div className="flex items-center gap-2">
        <span>Rows Per Page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="bg-gray-900/30 border border-gray-800 rounded px-2 py-1 text-white outline-none focus:border-indigo-500"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
          >
            <ChevronFirst className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="min-w-[120px] text-center">
            {currentPage} of {totalPages.toLocaleString()}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
          >
            <ChevronLast className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface BlocksListProps {
  blocks: Block[]
}

export default function BlocksList({ blocks }: BlocksListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const totalPages = 5508032 // This would normally come from an API

  return (
    <div className="bg-black text-white p-4 min-h-screen">
      {/* Mobile & Tablet View */}
      <div className="lg:hidden space-y-3">
        {blocks.map((block, index) => (
          <BlockCard key={index} block={block} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <h2 className="text-2xl font-bold">Blocks</h2>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  )
}

