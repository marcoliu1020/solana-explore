export type Block = {
  id: string
  hash: string
  transactions: number
  rewards: number
  validator: string
  efficiency: {
    used: string
    total: string
    percentage: number
  }
  time: string
}

export function getBlocks() {
  return mockBlocks
}

export const mockBlocks: Block[] = [
  // Generate 100 unique blocks with varying data
  ...Array.from({ length: 100 }, (_, i) => {
    const id = String(i + 1).padStart(3, '0')
    const validators = ['FZ4MT1HYJHd8X6v', 'DRpbCBMxVnD7Kp2', '9rkJMARqK6V3Ls8', 'H2NkX9YmP4qR5Wt', 'T7vBgQ8cL3nM6Uj']

    const getRandomHash = () => {
      const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
      return Array.from({ length: 11 }, () => chars[Math.floor(Math.random() * chars.length)]).join('') + '...'
    }

    const getRandomTime = () => {
      const times = ['a minute ago', '2 minutes ago', '5 minutes ago', '10 minutes ago', 'an hour ago']
      return times[Math.floor(Math.random() * times.length)]
    }

    const transactions = Math.floor(Math.random() * (2500 - 1000) + 1000)
    const used = (Math.random() * (35 - 15) + 15).toFixed(1)
    const total = '48M'
    const percentage = ((parseFloat(used) / 48) * 100).toFixed(2)

    return {
      id,
      hash: getRandomHash(),
      transactions,
      rewards: Math.floor(Math.random() * 3) + 1,
      validator: validators[Math.floor(Math.random() * validators.length)],
      efficiency: {
        used: `${used}M`,
        total,
        percentage: parseFloat(percentage),
      },
      time: getRandomTime(),
    }
  }).sort((a, b) => parseInt(b.id) - parseInt(a.id)),
]
