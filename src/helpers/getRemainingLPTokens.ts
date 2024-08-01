import { PublicKey } from '@solana/web3.js';
import { connection } from '../config/rpcConnectionConfig';

async function getRemainingLPTokens(mintAddress: string) {
  const mintPublicKey = new PublicKey(mintAddress);

  // Fetch the supply of the LP token
  const supplyResponse = await connection.getTokenSupply(mintPublicKey);
  const totalSupply = supplyResponse.value.uiAmount;

  if (totalSupply === 0) {
    console.log('All LP tokens have been burned.');
  } else {
    console.log(`Total LP tokens remaining: ${totalSupply}`);
  }

  return totalSupply;
}

export default getRemainingLPTokens;
