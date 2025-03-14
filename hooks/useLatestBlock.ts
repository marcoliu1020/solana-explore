import { getBlocks } from '@/apis/getBlocks'
import useSWR from 'swr'

export function useLatestBlock() {
  const { data, error, isLoading, isValidating } = useSWR(
    '/getLatestBlock',
    () => getBlocks({ pageSize: 1 }),
  )

  return {
    data,
    error,
    isLoading,
    isValidating,
  }
}
