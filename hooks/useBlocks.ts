import { getBlocks, type QueryParams } from '@/apis/getBlocks'
import { useState } from 'react'
import useSWR from 'swr'

export function useBlocks(queryParams: QueryParams = {}) {
  const args = ['/getBlocks', ...Object.values(queryParams)]
  const { data, error, isLoading, isValidating } = useSWR(args, () => getBlocks(queryParams), {
    keepPreviousData: true,
  })

  // pagination
  const previousBlockNumber = data?.pagination.previous
  const nextBlockNumber = data?.pagination.next

  // set total blocks
  const [totalBlocks, setTotalBlocks] = useState(0)
  if (data && data.data.length > 0) {
    if (!totalBlocks) setTotalBlocks(data.data[0].blockNumber)
  }

  return { data, error, isLoading, isValidating, previousBlockNumber, nextBlockNumber, totalBlocks }
}
