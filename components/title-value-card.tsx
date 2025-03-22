'use client'

import { cn } from '@/lib/utils'

export type TitleValue = {
  title: string
  value: React.ReactNode
}

type Props = {
  titleValues: TitleValue[]
  className?: string
}

export default function TitleValueCard({ titleValues, className }: Props) {
  return (
    <ul
      className={cn(
        'rounded-lg border border-gray-200 p-6',
        '*:border-b *:border-gray-600 *:py-2',
        '*:last:border-b-0 *:last:pb-0',
        '*:first:pt-0',
        className,
      )}
    >
      {titleValues.map((titleValue) => (
        <li
          key={titleValue.title}
          className={cn(
            'grid grid-cols-1 gap-2 md:grid-cols-[1fr_3fr]',
            className,
          )}
        >
          <RowTitle title={titleValue.title} />
          <RowValue
            className="overflow-hidden md:text-right"
            value={titleValue.value}
          />
        </li>
      ))}
    </ul>
  )
}

function RowTitle({ title, className }: { title: string; className?: string }) {
  return <h3 className={cn('font-bold text-gray-500', className)}>{title}</h3>
}

function RowValue({
  value,
  className,
}: {
  value: React.ReactNode
  className?: string
}) {
  return <div className={cn('text-gray-100', className)}>{value}</div>
}
