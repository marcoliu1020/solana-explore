"use client"

import { useState } from "react"
import { BlockCard } from "@/components/block-card"
import { Pagination } from "@/components/pagination"
import { BlocksTable } from "@/components/blocks-list/BlocksTable"
import { useBlocks } from "@/hooks/useBlocks"

export default function BlocksList() {
  const { data, error, isLoading } = useBlocks()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const totalPages = 5508032 // This would normally come from an API

  const blocks = data?.data

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!blocks) return <div>No blocks</div>

  console.log(blocks)

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
            time={block.data.blockTime}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </MobileView>

      {/* Desktop View */}
      <DesktopView>
        <PageTitle title="Blocks" />
        <BlocksTable blocks={blocks.map(block => ({
          blockNumber: block.blockNumber,
          hash: block.data.hash,
          transactions: block.data.numberOfTransactions,
          rewards: block.data.numberOfRewards,
          validator: block.data.producer,
          time: block.data.blockTime,
        }))} />
        <Pagination
          className="mt-4"
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
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
  return <div className="hidden lg:block">{children}</div>
}