export interface Block {
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
  {
    id: "325401570",
    hash: "3yYXJFDqiTm...",
    transactions: 1765,
    rewards: 1,
    validator: "FZ4MT1HYJHd...",
    efficiency: { used: "21.3M", total: "48M", percentage: 44.4 },
    time: "an hour ago",
  },
  {
    id: "325401569",
    hash: "A1KhLc28s78...",
    transactions: 1814,
    rewards: 1,
    validator: "FZ4MT1HYJHd...",
    efficiency: { used: "20.4M", total: "48M", percentage: 42.54 },
    time: "an hour ago",
  },
  {
    id: "325401568",
    hash: "H2JXDbtEv3o...",
    transactions: 2000,
    rewards: 1,
    validator: "FZ4MT1HYJHd...",
    efficiency: { used: "20.6M", total: "48M", percentage: 42.87 },
    time: "an hour ago",
  },
  {
    id: "325401567",
    hash: "6oqpJQyiqHV...",
    transactions: 1612,
    rewards: 1,
    validator: "DRpbCBMxVnD...",
    efficiency: { used: "29.9M", total: "48M", percentage: 62.26 },
    time: "an hour ago",
  },
  {
    id: "325401566",
    hash: "FWuGt4zuDeG...",
    transactions: 1787,
    rewards: 1,
    validator: "DRpbCBMxVnD...",
    efficiency: { used: "23.4M", total: "48M", percentage: 48.79 },
    time: "an hour ago",
  },
  {
    id: "325401565",
    hash: "2aFjR4RQd2f...",
    transactions: 1751,
    rewards: 1,
    validator: "DRpbCBMxVnD...",
    efficiency: { used: "15.1M", total: "48M", percentage: 31.37 },
    time: "an hour ago",
  },
  {
    id: "325401564",
    hash: "6MySe1cPdSX...",
    transactions: 2135,
    rewards: 1,
    validator: "DRpbCBMxVnD...",
    efficiency: { used: "23.5M", total: "48M", percentage: 48.95 },
    time: "an hour ago",
  },
  {
    id: "325401563",
    hash: "DyLJ8BZNsb3...",
    transactions: 1730,
    rewards: 1,
    validator: "9rkJMARqK6V...",
    efficiency: { used: "17.7M", total: "48M", percentage: 36.78 },
    time: "an hour ago",
  },
]

