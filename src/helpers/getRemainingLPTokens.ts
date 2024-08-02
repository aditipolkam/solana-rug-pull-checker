import { PublicKey } from '@solana/web3.js';
import { connection } from '../config/rpcConnectionConfig';

async function getRemainingLPTokens(mintAddress: string) {
  try {
    const mintPublicKey = new PublicKey(mintAddress);

    // fetch the supply of the LP token
    const supplyResponse = await connection.getTokenSupply(mintPublicKey);
    const totalSupply = supplyResponse.value.uiAmount;

    if (totalSupply === 0) {
      console.log('All LP tokens have been burned.');
    } else {
      console.log(`Total LP tokens remaining: ${totalSupply}`);
    }

    return totalSupply;
  } catch (error) {
    return null;
  }
}

export default getRemainingLPTokens;
