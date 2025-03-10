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

export async function getBlocks(): Promise<Blocks> {
    const res = await fetch(url);
    const data = await res.json();
    return data.result;
}