# Solana Expore

## How to run

1. pnpm intall
2. pnpm dev

## Pages

1. ### Blocks
   1. url: /blocks
   2. data:
      - using https://solana.fm/ blocks API (https://api.solana.fm/v0/blocks)
      - client side fetch
2. ### Block Detail
   1. url: /block?blockNumber=`327755875`
   2. data:
      - using @solana/web3.js tool from mainnet-beta chain
      - server side fetch
3. ### Transaction Details
   1. url: /transaction?signature=`5zTEsPYGrHZFAAZe1TDuGWmHSr3wNFq6ZRu8iCiCqT6HTYUMTdXPTjATAWZXg6xPUpZ5GMXB6LD2tkHkRYxZXZyA`
   2. data:
      - using @solana/web3.js tool from mainnet-beta chain
      - server side fetch

## Repository

- https://github.com/marcoliu1020/solana-explore

## Deploy

1. on Vercel
2. https://solana-explore.vercel.app
