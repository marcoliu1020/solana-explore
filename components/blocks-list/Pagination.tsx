import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const pageSizeOptions = [20, 50, 100]

  return (
    <div className="flex items-center justify-between pt-4 text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <span>Rows Per Page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded border border-gray-800 bg-gray-900/30 px-2 py-1 text-white outline-none focus:border-indigo-500"
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
            <ChevronFirst className="h-5 w-5" />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="min-w-[120px] text-center">
            {currentPage} of {totalPages.toLocaleString()}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
          >
            <ChevronLast className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
