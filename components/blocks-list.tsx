'use client'

import { BlockCard } from '@/components/block-card'
import { BlocksTable } from '@/components/blocks-list/BlocksTable'
import { Pagination, type OnPageAction } from '@/components/pagination'
import { useBlocks } from '@/hooks/useBlocks'
import { useLatestBlock } from '@/hooks/useLatestBlock'
import { useState } from 'react'

export default function BlocksList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pivotBlockNumber, setPivotBlockNumber] = useState(-1) // -1 means latest block

  // total pages
  const { latestBlock } = useLatestBlock()
  const [pageSize, setPageSize] = useState(5)
  const totalBlocks = latestBlock?.blockNumber ?? 0
  const totalPages = Math.ceil(totalBlocks / pageSize)

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
    pageSize: pageSize,
  })
  console.log(blocks)

  const handlePageChange = (action: OnPageAction) => {
    if (isValidating) return // prevent double clicks

    switch (action) {
      case 'FIRST_PAGE':
        setPivotBlockNumber(-1)
        setCurrentPage(1)
        break
      case 'LAST_PAGE':
        const lastPivotBlockNumber = pageSize
        setPivotBlockNumber(lastPivotBlockNumber)
        setCurrentPage(totalPages)
        break
      case 'NEXT_PAGE':
        const nextPage = currentPage + 1
        if (nextPage > totalPages) return
        if (!nextBlockNumber) return alert('No more blocks')
        setPivotBlockNumber(nextBlockNumber)
        setCurrentPage(nextPage)
        break
      case 'PREV_PAGE':
        const prevPage = currentPage - 1
        if (prevPage < 1) return
        if (!previousBlockNumber) return alert('No more blocks')
        setPivotBlockNumber(previousBlockNumber)
        setCurrentPage(prevPage)
        break
      default:
        alert('Invalid Page Action')
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
