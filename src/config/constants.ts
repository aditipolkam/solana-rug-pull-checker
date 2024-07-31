import dotenv from 'dotenv';
dotenv.config();

export const SOLANA_RPC = process.env.ALCHEMY_API_KEY
  ? `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  : 'https://api.mainnet-beta.solana.com';
