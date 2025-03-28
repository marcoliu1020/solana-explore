import { cn } from '@/lib/utils'
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

export type StateProps = {
  currentPage: number
  totalPages: number
  pageSize: number
  pageSizeOptions?: number[]
  className?: string
}

export type ActionProps = {
  onPageChange: (action: OnPageAction) => void
  onPageSizeChange: (size: number) => void
}

export type OnPageAction =
  | 'PREV_PAGE'
  | 'NEXT_PAGE'
  | 'FIRST_PAGE'
  | 'LAST_PAGE'

type Props = StateProps & ActionProps

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [5, 10, 20, 40],
  className,
  onPageChange,
  onPageSizeChange,
}: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-between text-sm text-gray-400',
        className,
      )}
    >
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
            onClick={() => onPageChange('FIRST_PAGE')}
            disabled={currentPage === 1}
            className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
          >
            <ChevronFirst className="h-5 w-5" />
          </button>
          <button
            onClick={() => onPageChange('PREV_PAGE')}
            disabled={currentPage === 1}
            className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="min-w-[120px] text-center">
            {currentPage.toLocaleString()} of {totalPages.toLocaleString()}
          </span>
          <button
            onClick={() => onPageChange('NEXT_PAGE')}
            disabled={currentPage === totalPages}
            className="p-1 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => onPageChange('LAST_PAGE')}
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
