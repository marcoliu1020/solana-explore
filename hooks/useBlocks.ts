import useSWR from "swr"
import { getBlocks, type QueryParams } from "@/apis/getBlocks"

export function useBlocks(queryParams: QueryParams = {}) {
  const args = ['/getBlocks', ...Object.values(queryParams)]
  const { data, error, isLoading, isValidating } = useSWR(args, () => getBlocks(queryParams), {
    keepPreviousData: true,
  })
  const previousBlockNumber = data?.pagination.previous
  const nextBlockNumber = data?.pagination.next

  return { data, error, isLoading, isValidating, previousBlockNumber, nextBlockNumber }
}