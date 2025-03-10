import useSWR from "swr"
import { url, getBlocks } from "@/apis/getBlocks"

export function useBlocks() {
  const tag = url.toString();
  const { data, error, isLoading } = useSWR(tag, getBlocks)
  return { data, error, isLoading }
}
