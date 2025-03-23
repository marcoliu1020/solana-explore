import CopyClipboard from '@/components/copy-clipboard'
import LinkWithColor from '@/components/link-with-color'
import { ErrorBadge, SuccessBadge } from '@/components/status-badge'
import { toSolanaAmount } from '@/lib/utils'
import type { VersionedTransactionResponse } from '@solana/web3.js'

export const txDetailDTO = (transaction: VersionedTransactionResponse) => {
  return [
    {
      title: 'Signature',
      value: (
        <>
          <div className="flex items-center gap-2 md:justify-end">
            <p className="overflow-hidden text-ellipsis">
              {transaction.transaction.signatures[0]}
            </p>
            <CopyClipboard text={transaction.transaction.signatures[0]} />
          </div>
        </>
      ),
    },
    {
      title: 'Block',
      value: (
        <LinkWithColor href={`/block?blockNumber=${transaction.slot}`}>
          {transaction.slot}
        </LinkWithColor>
      ),
    },
    {
      title: 'Timestamp',
      value: transaction.blockTime
        ? new Date(transaction.blockTime * 1000).toUTCString()
        : 'N/A',
    },
    {
      title: 'Result',
      value: transaction.meta?.err ? <ErrorBadge /> : <SuccessBadge />,
    },
    {
      title: 'Signer',
      value: (
        <div className="flex items-center gap-2 md:justify-end">
          <p className="overflow-hidden text-ellipsis">
            {transaction.transaction.message.staticAccountKeys[0].toString()}
          </p>
          <CopyClipboard
            text={transaction.transaction.message.staticAccountKeys[0].toString()}
          />
        </div>
      ),
    },
    {
      title: 'Fee',
      value: toSolanaAmount(transaction.meta?.fee ?? 0),
    },
    {
      title: 'Compute Units Consumed',
      value: transaction.meta?.computeUnitsConsumed,
    },
    {
      title: 'Transaction Version',
      value: transaction.version,
    },
    {
      title: 'Previous Blockhash',
      value: (
        <div className="flex items-center gap-2 md:justify-end">
          <p className="overflow-hidden text-ellipsis">
            {transaction.transaction.message.recentBlockhash}
          </p>
          <CopyClipboard
            text={transaction.transaction.message.recentBlockhash}
          />
        </div>
      ),
    },
  ]
}
