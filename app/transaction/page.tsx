import { getTransaction } from '@/apis/solana-rpc/getTransaction'
import { MessagesList } from '@/components/messages-list'
import PageTitle from '@/components/page-title'
import TitleValueCard from '@/components/title-value-card'
import { notFound } from 'next/navigation'
import { txDetailDTO } from './helper'

type SearchParams = Promise<{
  signature?: string
}>

export default async function TransactionPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const transactionSignature = searchParams.signature
  if (!transactionSignature) {
    return notFound()
  }

  const transaction = await getTransaction(transactionSignature)
  if (!transaction) {
    return notFound()
  }
  // tx detail DTO
  const txDetail = txDetailDTO(transaction)
  // logs
  const logMessages = transaction.meta?.logMessages

  return (
    <main className="mx-auto max-w-screen-lg p-4">
      {/* tx detail */}
      <div>
        <PageTitle title="Transaction Details" />
        <TitleValueCard className="mt-2" titleValues={txDetail} />
      </div>

      {/* logs */}
      {logMessages && logMessages.length > 0 && (
        <div className="mt-4">
          <PageTitle title="Logs" />
          <MessagesList className="mt-2" logs={logMessages} />
        </div>
      )}
    </main>
  )
}
