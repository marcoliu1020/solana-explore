"use client"

import type { Block } from "@/data/blocks"
import { useState } from "react"
import { BlockCard } from "@/components/block-card"
import { Pagination } from "@/components/pagination"
import { BlocksTable } from "@/components/blocks-list/BlocksTable"

type Props = {
  blocks: Block[]
}

export default function BlocksList({ blocks }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const totalPages = 5508032 // This would normally come from an API

  return (
    <div className="bg-black text-white p-4 min-h-screen">
      {/* Mobile & Tablet View */}
      <MobileView>
        <PageTitle title="Blocks" />
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
      </MobileView>

      {/* Desktop View */}
      <DesktopView>
        <PageTitle title="Blocks" />
        <BlocksTable blocks={blocks} />
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