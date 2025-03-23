import { cn } from '@/lib/utils'

type Props = {
  logs: string[]
  className?: string
}

export const MessagesList = ({ logs, className }: Props) => {
  return (
    <ul
      className={cn(
        'grid grid-cols-[auto_1fr] gap-2',
        'rounded-lg border border-gray-200',
        'w-full p-6',
        className,
      )}
    >
      {logs.map((log, index) => (
        <li key={index} className="col-span-2 grid grid-cols-subgrid">
          <span className="min-w-[2rem] font-bold">{index + 1}</span>
          <span className="overflow-auto text-balance">{log}</span>
        </li>
      ))}
    </ul>
  )
}
