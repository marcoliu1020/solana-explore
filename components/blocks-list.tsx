'use client'

import { BlockCard } from '@/components/block-card'
import { BlocksTable } from '@/components/blocks-list/BlocksTable'
import { Pagination } from '@/components/pagination'
import { useBlocks } from '@/hooks/useBlocks'
import { useLatestBlock } from '@/hooks/useLatestBlock'
import { useState } from 'react'

export default function BlocksList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pivotBlockNumber, setPivotBlockNumber] = useState(-1)

  // blocks data
  const {
    error,
    isLoading,
    isValidating,
    blocks,
    previousBlockNumber,
    nextBlockNumber,
  } = useBlocks({
    from: pivotBlockNumber <= 0 ? '' : String(pivotBlockNumber),
    pageSize: 100,
  })
  console.log(blocks)

  // total pages
  const { latestBlock } = useLatestBlock()
  const [pageSize, setPageSize] = useState(5)
  const totalBlocks = latestBlock?.blockNumber ?? 0
  const totalPages = Math.ceil(totalBlocks / pageSize)
  
  const handlePageChange = (page: number) => {
    if (isValidating) return // prevent double clicks

    const isFirstPage = page === 1
    const isLastPage = page === totalPages
    const isPreviousPage = page === currentPage - 1 && previousBlockNumber
    const isNextPage = page === currentPage + 1 && nextBlockNumber

    if (isFirstPage) {
      setPivotBlockNumber(-1)
      setCurrentPage(page)
    } else if (isLastPage) {
      setPivotBlockNumber(1) // first block number
      setCurrentPage(page)
    } else if (isNextPage) {
      setPivotBlockNumber(nextBlockNumber ?? 0)
      setCurrentPage(page)
    } else if (isPreviousPage) {
      setPivotBlockNumber(previousBlockNumber ?? 0)
      setCurrentPage(page)
    } else {
      alert('Invalid page')
    }
  }

  if (isLoading && !blocks) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!blocks) return <div>No blocks</div>
  return (
    <div className="min-h-screen bg-black p-4 text-white">
      {/* Mobile & Tablet View */}
      <MobileView>
        <PageTitle title="Blocks" />
        {blocks.map((block) => (
          <BlockCard
            key={block.blockNumber}
            blockNumber={block.blockNumber}
            hash={block.data.hash}
            transactions={block.data.numberOfTransactions}
            rewards={block.data.numberOfRewards}
            validator={block.data.producer}
            time={block.data.blockTime * 1000}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={setPageSize}
        />
      </MobileView>

      {/* Desktop View */}
      <DesktopView>
        <PageTitle title="Blocks" />
        <BlocksTable
          className="mt-4"
          blocks={blocks.map((block) => ({
            blockNumber: block.blockNumber,
            hash: block.data.hash,
            transactions: block.data.numberOfTransactions,
            rewards: block.data.numberOfRewards,
            validator: block.data.producer,
            time: block.data.blockTime * 1000,
          }))}
        />
        <Pagination
          className="mt-4"
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={setPageSize}
        />
      </DesktopView>
    </div>
  )
}

function PageTitle({ title }: { title: string }) {
  return <h2 className="text-2xl font-bold">{title}</h2>
}

function MobileView({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3 lg:hidden">{children}</div>
}

function DesktopView({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto hidden max-w-6xl lg:block">{children}</div>
}
