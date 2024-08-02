// import { PublicKey } from '@solana/web3.js';
// import getAccountInfo from './getAccountInfo';

// async function getLPMintAddress(address: string) {
//   const accountInfo = await getAccountInfo(address);
//   const base64Data = accountInfo.data[0];
//   console.log({ lpmint: accountInfo.data });
//   const buffer = Buffer.from(base64Data, 'base64');
//   const mintPublicKey = new PublicKey(buffer.slice(0, 32));
//   console.log('LP Mint Address:', mintPublicKey.toBase58());
//   return mintPublicKey.toBase58();
// }

import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';

async function getLPMintAddress(tokenAccountAddress: string, deployer: string) {
  try {
    const mint = new PublicKey(tokenAccountAddress);
    const owner = new PublicKey(deployer);

    const tokenAddress = await getAssociatedTokenAddress(mint, owner);
    return tokenAddress.toBase58();
  } catch (error) {
    console.error('Error fetching token mint address:', error);
    return '';
  }
}

export default getLPMintAddress;
