"use client"
import { useState } from "react"
import { BlockCard } from "@/components/block-card"
import { Pagination } from "@/components/pagination"
import { BlocksTable } from "@/components/blocks-list/BlocksTable"
import { useBlocks } from "@/hooks/useBlocks"

export default function BlocksList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentBlockNumber, setCurrentBlockNumber] = useState("")
  const [pageSize, setPageSize] = useState(5)
  const { data, error, isLoading, isValidating, previousBlockNumber, nextBlockNumber } = useBlocks({
    from: currentBlockNumber,
    pageSize: pageSize,
  })
  const totalPages = 5508032 // This would normally come from an API

  // blocks data
  const blocks = data?.data
  console.log(blocks)

  const handlePageChange = (page: number) => {
    if (isValidating) return // prevent double clicks

    const isFirstPage = page === 1
    const isLastPage = page === totalPages
    const isPreviousPage = page === currentPage - 1 && previousBlockNumber
    const isNextPage = page === currentPage + 1 && nextBlockNumber

    if (isFirstPage) {
      setCurrentBlockNumber("")
      setCurrentPage(page)
    } else if (isLastPage) {
      setCurrentBlockNumber("1") // first block number
      setCurrentPage(page)
    } else if (isNextPage) {
      setCurrentBlockNumber(nextBlockNumber?.toString() ?? "")
      setCurrentPage(page)
    } else if (isPreviousPage) {
      setCurrentBlockNumber(previousBlockNumber?.toString() ?? "")
      setCurrentPage(page)
    } else {
      alert("Invalid page")
    }
  }

  if (isLoading && !blocks) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!blocks) return <div>No blocks</div>
  return (
      <div className="bg-black text-white p-4 min-h-screen">
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
          <BlocksTable className="mt-4" blocks={blocks.map(block => ({
            blockNumber: block.blockNumber,
            hash: block.data.hash,
            transactions: block.data.numberOfTransactions,
            rewards: block.data.numberOfRewards,
            validator: block.data.producer,
            time: block.data.blockTime * 1000,
          }))} />
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
  return <div className="lg:hidden space-y-3">{children}</div>
}

function DesktopView({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto hidden lg:block">{children}</div>
}