import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function LinkWithColor({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn('text-indigo-400 hover:text-indigo-300', className)}
    >
      {children}
    </Link>
  )
}
