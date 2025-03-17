import CopyClipboard from '@/components/copy-clipboard'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Fuel } from 'lucide-react'

type Transaction = {
  signature: string
  signer: string
  fee: number
}

type Props = {
  transactions: Transaction[]
  className?: string
}

export function TransactionsTable({ transactions, className }: Props) {
  return (
    <div className={cn('rounded-lg border border-gray-200 p-6', className)}>
      <div className="grid grid-flow-col gap-8 px-2 md:grid-cols-3">
        <div className="font-bold text-gray-400">SIGNATURE</div>
        <div className="font-bold text-gray-400">SIGNER</div>
        <div className="font-bold text-gray-400">FEE</div>
      </div>

      {transactions.map((tx) => (
        <div
          key={tx.signature}
          className={cn(
            'grid grid-cols-1 gap-3 p-2 md:grid-cols-3 md:gap-8',
            'mt-2 text-base',
            'rounded-2xl border border-gray-800',
            'hover:bg-gray-800/50',
          )}
        >
          <div className="flex items-center gap-1">
            <Link
              href={`/transaction?signature=${tx.signature}`}
              className="max-w-[20rem] overflow-hidden text-ellipsis text-indigo-400 hover:text-indigo-300"
            >
              {tx.signature}
            </Link>
            <CopyClipboard text={tx.signature} />
          </div>

          <div className="flex items-center gap-1">
            <span className="max-w-[20rem] overflow-hidden text-ellipsis">
              {tx.signer}
            </span>
            <CopyClipboard text={tx.signer} />
          </div>

          <div className="flex items-center gap-1">
            <Fuel className="size-5" />
            <span>{tx.fee}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
