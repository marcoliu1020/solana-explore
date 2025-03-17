'use client'

import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import Link from 'next/link'
import CopyClipboard from './copy-clipboard'

type Props = {
  blockNumber: number
  timestamp: number
  blockHash: string
  leader: string
  rewardInSol: number
  transactions: number
  previousBlock: string
}

export function BlockDetail({
  blockNumber,
  timestamp,
  blockHash,
  leader,
  rewardInSol,
  transactions,
  previousBlock,
}: Props) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 p-6',
        '*:border-b *:border-gray-600 *:py-2',
        '*:last:border-b-0 *:last:pb-0',
        '*:first:pt-0',
      )}
    >
      {/* {/* Block Number Row */}
      <Row>
        <RowTitle title="Block" />
        <div className="flex items-center gap-4">
          <RowValue value={blockNumber} />
          <div className="flex gap-2">
            <Link
              data-testid="previous-block-link"
              href={`/block?blockNumber=${blockNumber - 1}`}
            >
              <ChevronLeft className="size-7 cursor-pointer rounded-lg border border-gray-700 p-0.5 hover:bg-gray-600" />
            </Link>
            <Link
              data-testid="next-block-link"
              href={`/block?blockNumber=${blockNumber + 1}`}
            >
              <ChevronRight className="size-7 cursor-pointer rounded-lg border border-gray-700 p-0.5 hover:bg-gray-600" />
            </Link>
          </div>
        </div>
      </Row>

      {/* Timestamp Row */}
      <Row>
        <RowTitle title="Timestamp" />
        <div className="flex flex-wrap items-center gap-2">
          <RowValue value={formatDistanceToNow(timestamp * 1000)} />
          <div className="flex items-center gap-1">
            <RowSubValue value={<Clock className="size-4" />} />
            <RowSubValue value={new Date(timestamp * 1000).toUTCString()} />
          </div>
        </div>
      </Row>

      {/* Block Hash Row */}
      <Row>
        <RowTitle title="Block Hash" />
        <div className="flex items-center gap-2 overflow-hidden">
          <RowValue
            className="overflow-hidden text-ellipsis"
            value={blockHash}
          />
          <CopyClipboard text={blockHash} />
        </div>
      </Row>

      {/* Leader Row */}
      <Row>
        <RowTitle title="Leader" />
        <div className="flex items-center gap-2 overflow-hidden">
          <RowValue className="overflow-hidden text-ellipsis" value={leader} />
          <CopyClipboard text={leader} />
        </div>
      </Row>

      {/* Reward Row */}
      <Row>
        <RowTitle title="Reward" />
        <div className="flex items-center gap-2">
          <RowValue value={rewardInSol} />
          <RowSubValue value={'SOL'} />
        </div>
      </Row>

      {/* Transactions Row */}
      <Row>
        <RowTitle title="Transactions" />
        <div className="flex items-center gap-2">
          <RowSubValue value={'Total'} />
          <RowValue value={transactions} />
          <RowSubValue value={'transactions'} />
        </div>
      </Row>

      {/* Previous Block Hash Row */}
      <Row>
        <RowTitle title="Previous Block Hash" />
        <div className="flex items-center gap-2 overflow-hidden">
          <RowValue
            className="overflow-hidden text-ellipsis"
            value={previousBlock}
          />
          <CopyClipboard text={previousBlock} />
        </div>
      </Row>
    </div>
  )
}

function Row({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <li
      className={cn(
        'flex flex-col gap-2 md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      {children}
    </li>
  )
}

function RowTitle({ title, className }: { title: string; className?: string }) {
  return <h3 className={cn('font-medium', className)}>{title}</h3>
}
function RowValue({
  value,
  className,
}: {
  value: React.ReactNode
  className?: string
}) {
  return <span className={cn('text-gray-100', className)}>{value}</span>
}

function RowSubValue({
  value,
  className,
}: {
  value: React.ReactNode
  className?: string
}) {
  return <span className={cn('text-gray-500', className)}>{value}</span>
}
