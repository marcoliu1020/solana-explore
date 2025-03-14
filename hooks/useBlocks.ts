import { getBlocks, type QueryParams } from '@/apis/getBlocks'
import useSWR from 'swr'

export function useBlocks(queryParams: QueryParams = {}) {
  const args = ['/getBlocks', ...Object.values(queryParams)]
  const { data, error, isLoading, isValidating } = useSWR(
    args,
    () => getBlocks(queryParams),
    {
      keepPreviousData: true,
    },
  )

  // blocks data
  const blocks = data?.data
  const previousBlockNumber = data?.pagination.previous
  const nextBlockNumber = data?.pagination.next

  return {
    data,
    error,
    isLoading,
    isValidating,
    // blocks data
    blocks,
    previousBlockNumber,
    nextBlockNumber,
  }
}
