import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import bs58 from 'bs58'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const toSolanaAmount = (amount: number) => {
  if (!amount) return 0
  return amount / LAMPORTS_PER_SOL
}

export const toBase58 = (data: Buffer) => {
  return bs58.encode(data)
}

export const toHex = (data: Buffer) => {
  return data.toString('hex')
}
