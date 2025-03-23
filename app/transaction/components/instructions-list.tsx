'use client'

import CopyClipboard from '@/components/copy-clipboard'
import { cn, toBase58, toHex } from '@/lib/utils'
import { MessageCompiledInstruction } from '@solana/web3.js'
import { ArrowUpDown } from 'lucide-react'
import { useState } from 'react'

type Props = {
  accountIDs: string[]
  instructions: MessageCompiledInstruction[]
  className?: string
}

export default function InstructionsList({
  accountIDs,
  instructions,
  className,
}: Props) {
  return (
    <ul
      className={cn(
        'grid gap-2 p-6',
        'rounded-lg border border-gray-200',
        className,
      )}
    >
      {instructions.map((instruction, index) => (
        <li
          key={index}
          className={cn(
            'grid grid-cols-[auto_1fr] gap-x-8 gap-y-2',
            'overflow-hidden p-4',
            'rounded-lg border border-gray-200',
          )}
        >
          {/* row 1: interact with */}
          <div className="col-span-2 grid md:grid-cols-subgrid">
            <RowTitle className="text-nowrap" title="Interact With" />
            <ProgramId
              className="w-full"
              programId={accountIDs[instruction.programIdIndex]}
            />
          </div>

          {/* row 2: instruction data */}
          <div className="col-span-2 grid md:grid-cols-subgrid">
            <RowTitle className="text-nowrap" title="Instruction Data" />
            <InstructionData className="w-full" data={instruction.data} />
          </div>
        </li>
      ))}
    </ul>
  )
}

function ProgramId({
  programId,
  className,
}: {
  programId: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-2 overflow-hidden', className)}>
      <span className="overflow-hidden text-ellipsis">{programId}</span>
      <CopyClipboard text={programId} />
    </div>
  )
}

function InstructionData({
  data,
  className,
}: {
  data: Uint8Array
  className?: string
}) {
  const [encoding, setEncoding] = useState<'hex' | 'base58'>('hex')
  const bufferData = Buffer.from(data)
  const encodedData =
    encoding === 'hex' ? toHex(bufferData) : toBase58(bufferData)
  const toggleButton = (
    <button
      onClick={() => setEncoding(encoding === 'hex' ? 'base58' : 'hex')}
      title={`View in ${encoding === 'hex' ? 'base58' : 'hex'}`}
    >
      <ArrowUpDown className="size-4 cursor-pointer text-lime-500 hover:text-lime-400" />
    </button>
  )

  return (
    <div className={cn('flex items-center gap-2 overflow-hidden', className)}>
      {toggleButton}
      <span className="font-medium text-gray-500">
        {encoding.toUpperCase()}:
      </span>
      <span className="overflow-hidden font-mono text-ellipsis">
        {encodedData}
      </span>
      <CopyClipboard text={encodedData} />
    </div>
  )
}

function RowTitle({ title, className }: { title: string; className?: string }) {
  return <h3 className={cn('font-bold text-gray-500', className)}>{title}</h3>
}
