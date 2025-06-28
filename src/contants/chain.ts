export type Chain = {
  id: number;
  name: string;
  rpcUrl: string;
};

export const CHAINS: Chain[] = [
  {
    id: 1,
    name: "Ethtereum Mainnet",
    rpcUrl:
      "https://eth-mainnet.g.alchemy.com/v2/pROZKV3iBTKQmeO1jdj0cxvG6Y6zv0pQ",
  },
  {
    id: 2,
    name: "BNB Chain",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
  },
  {
    id: 3,
    name: "Sepolia Testnet",
    rpcUrl:
      "https://eth-sepolia.g.alchemy.com/v2/pROZKV3iBTKQmeO1jdj0cxvG6Y6zv0pQ",
  },
];
