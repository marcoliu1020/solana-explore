'use client'

import { cn, isValidSolanaSignature } from '@/lib/utils'
import { Search as SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Search({ className }: { className?: string }) {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (isValidSolanaSignature(input)) {
      setError('')
      router.push(`/transaction?signature=${input}`)
      setInput('')
    } else {
      setError('Invalid Solana signature. Please check and try again.')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setError('') // Clear error when user starts typing
  }

  return (
    <div className={cn('flex w-full items-center justify-center', className)}>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search by signature"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={cn(
            'w-full rounded-lg border px-4 py-2 text-sm text-gray-200 focus:outline-none',
            error
              ? 'border-red-500 bg-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-gray-700 bg-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500',
          )}
        />
        <button
          onClick={handleSearch}
          className="absolute top-1/2 right-2 -translate-y-1/2 p-2 text-purple-500 hover:text-purple-400"
        >
          <SearchIcon size={16} />
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
