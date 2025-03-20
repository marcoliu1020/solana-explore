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
    <div
      className={cn(
        'grid grid-cols-3 gap-x-4 gap-y-2',
        'rounded-lg border border-gray-200 p-6',
        className,
      )}
    >
      <div className="col-span-3 grid grid-flow-col md:grid-cols-subgrid">
        <div className="font-bold text-gray-400">SIGNATURE</div>
        <div className="font-bold text-gray-400">SIGNER</div>
        <div className="font-bold text-gray-400">FEE</div>
      </div>

      {transactions.map((tx) => (
        <div
          key={tx.signature}
          className={cn(
            'col-span-3 grid grid-cols-1 gap-y-2 md:grid-cols-subgrid',
            'p-2 text-base',
            'rounded-2xl border border-gray-700',
            'hover:bg-gray-800/50',
          )}
        >
          <div className="flex items-center gap-1 border-0 border-red-800">
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

          <div className="flex items-center gap-1 border-0 border-blue-800">
            <Fuel className="size-5" />
            <span>{tx.fee}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
