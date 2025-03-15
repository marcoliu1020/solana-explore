import { getBlocks, type QueryParams } from '@/apis/getBlocks'
import useSWR from 'swr'

// 如果你要搜尋「區塊 1」，參數設定如下：
// 1. from: 1
// 2. size: 5
// 3. reverse: true **沒有開啟的話，會找不到**

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
