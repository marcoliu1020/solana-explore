'use client'

import { BlockCard } from '@/components/block-card'
import { BlocksTable } from '@/app/blocks/blocks-list/BlocksTable'
import Pagination, { type OnPageAction } from '@/components/pagination'
import { useBlocks } from '@/hooks/useBlocks'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

export default function BlocksList({ className }: { className?: string }) {
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchFromHead, setIsSearchFromHead] = useState(false) // search from first block (No.1)
  const [pivotBlockNumber, setPivotBlockNumber] = useState(-1)

  // blocks data
  const {
    error,
    isLoading,
    isValidating,
    blocks: blocksData,
    previousBlockNumber: previousBlockNumberData,
    nextBlockNumber: nextBlockNumberData,
  } = useBlocks({
    from: pivotBlockNumber <= 0 ? '' : String(pivotBlockNumber),
    pageSize: pageSize,
    reverse: isSearchFromHead,
  })
  let blocks = blocksData
  let previousBlockNumber = previousBlockNumberData
  let nextBlockNumber = nextBlockNumberData

  // if searching from the beginning, reverse the blocks order
  if (isSearchFromHead) {
    previousBlockNumber = nextBlockNumberData
    nextBlockNumber = previousBlockNumberData
    blocks = blocksData?.toReversed()
  }
  // console.log('blocks', blocks)

  // init total pages
  const latestBlockRef = useRef(-1)
  const shouldInitLatestBlock =
    latestBlockRef.current === -1 &&
    pivotBlockNumber === -1 &&
    blocks &&
    blocks[0].blockNumber
  if (shouldInitLatestBlock) {
    latestBlockRef.current = blocks![0].blockNumber
  }
  const totalPages = Math.ceil(latestBlockRef.current / pageSize)

  // handle page change
  const handlePageChange = (action: OnPageAction) => {
    if (isValidating) return // prevent double clicks

    switch (action) {
      case 'FIRST_PAGE':
        setPivotBlockNumber(-1)
        setIsSearchFromHead(false)
        setCurrentPage(1)
        break
      case 'LAST_PAGE':
        setPivotBlockNumber(1)
        setIsSearchFromHead(true)
        setCurrentPage(totalPages)
        break
      case 'PREV_PAGE':
        const prevPage = currentPage - 1
        if (prevPage < 1) return
        if (!previousBlockNumber) return alert('No more blocks')
        setPivotBlockNumber(previousBlockNumber)
        setCurrentPage(prevPage)
        break
      case 'NEXT_PAGE':
        const nextPage = currentPage + 1
        if (nextPage > totalPages) return
        if (!nextBlockNumber) return alert('No more blocks')
        setPivotBlockNumber(nextBlockNumber)
        setCurrentPage(nextPage)
        break
      default:
        alert('Invalid Page Action')
    }
  }

  if (isLoading && !blocks) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!blocks) return <div>No blocks</div>
  return (
    <div className={cn('text-white', className)}>
      {/* Mobile & Tablet View */}
      <MobileView>
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
          className="mt-2"
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={setPageSize}
        />
      </MobileView>

      {/* Desktop View */}
      <DesktopView>
        <BlocksTable
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
          className="mt-2"
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

function MobileView({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3 lg:hidden">{children}</div>
}

function DesktopView({ children }: { children: React.ReactNode }) {
  return <div className="hidden lg:block">{children}</div>
}
