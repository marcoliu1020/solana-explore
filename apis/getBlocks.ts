import { SOLANA_FM_URL } from "./urls";

export type Block = {
    blockNumber: number
    data: {
        blockTime: number
        dataSize: number
        epoch: number
        hash: string
        number: number
        numberOfRewards: number
        numberOfTransactions: number
        parentNumber: number
        previousHash: string
        producer: string
        successfulTransactions: number
        totalComputeUnitsConsumed: number
        totalComputeUnitsLimit: number
        totalRewardAmount: number
        totalTxFees: number
        voteTransactions: number
    }
}

export type Blocks = {
    data: Block[]
    pagination: {
        next: number
        previous: number
    }
}

export const url = new URL('blocks', SOLANA_FM_URL);

type QueryParams = {
    from?: string
    pageSize?: number
    paginationType?: 'blockNumber' | 'blockTime'
    reverse?: boolean
}

export async function getBlocks(queryParams: QueryParams): Promise<Blocks> {
    const searchParams = new URLSearchParams({
        from: queryParams.from ?? '',
        pageSize: queryParams.pageSize?.toString() ?? '',
        paginationType: queryParams.paginationType ?? '',
        reverse: queryParams.reverse?.toString() ?? ''
    }).toString();

    const requestUrl = `${url}?${searchParams}`;
    const res = await fetch(requestUrl);
    const data = await res.json();

    return data.result;
}