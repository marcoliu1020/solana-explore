import { getTransaction } from '@/apis/solana-rpc/getTransaction'
import TitleValueCard from '@/components/title-value-card'
import { txDetailDTO } from './helper'
import PageTitle from '@/components/page-title'

type SearchParams = Promise<{
  signature?: string
}>

export default async function TransactionPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const transactionSignature = searchParams.signature

  if (!transactionSignature) {
    return <div>Transaction not found</div>
  }

  const transaction = await getTransaction(transactionSignature)

  if (!transaction) {
    return <div>Transaction not found</div>
  }

  console.log(transaction)

  // tx detail DTO
  const txDetail = txDetailDTO(transaction)

  return (
    <main className="mx-auto max-w-screen-lg p-4">
      <PageTitle title="Transaction Details" />
      <TitleValueCard className="mt-2" titleValues={txDetail} />
    </main>
  )
}
