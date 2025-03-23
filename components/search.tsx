'use client'

import { isBlockHashValid } from '@/apis/solana-rpc/isBlockHashValid'
import { cn, isValidSolanaBlockHash, isValidSolanaSignature } from '@/lib/utils'
import { Search as SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Search({ className }: { className?: string }) {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (isValidSolanaSignature(input)) {
      setError('')
      router.push(`/transaction?signature=${input}`)
      setInput('')
    } else if (isValidSolanaBlockHash(input)) {
      setError('')
      setIsLoading(true)
      try {
        // Convert block hash to block number using RPC
        const response = await isBlockHashValid(input)
        console.log(response)
        if (!response) {
          setError('Block not found')
          return
        }
        const blockNumber = response.result.parentSlot + 1
        router.push(`/block?blockNumber=${blockNumber}`)
        setInput('')
      } catch {
        setError('Failed to fetch block details')
      } finally {
        setIsLoading(false)
      }
    } else {
      setError(
        'Invalid Solana signature or block hash. Please check and try again.',
      )
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
      <div className="w-full max-w-3xl px-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by signature or block hash"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className={cn(
              'w-full rounded-lg border px-4 py-2 text-sm text-gray-200 focus:outline-none',
              error
                ? 'border-red-500 bg-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-700 bg-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500',
              isLoading && 'cursor-not-allowed opacity-50',
            )}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={cn(
              'absolute top-1/2 right-2 -translate-y-1/2 p-2 text-purple-500 hover:text-purple-400',
              isLoading && 'cursor-not-allowed opacity-50',
            )}
          >
            <SearchIcon size={16} />
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  )
}
