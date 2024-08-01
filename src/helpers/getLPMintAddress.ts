import { PublicKey } from '@solana/web3.js';
import getAccountInfo from './getAccountInfo';

async function getLPMintAddress(address: string) {
  const accountInfo = await getAccountInfo(address);
  const base64Data = accountInfo.data[0];
  console.log({ lpmint: accountInfo.data });
  const buffer = Buffer.from(base64Data, 'base64');
  const mintPublicKey = new PublicKey(buffer.slice(0, 32));
  console.log('LP Mint Address:', mintPublicKey.toBase58());
  return mintPublicKey.toBase58();
}

export default getLPMintAddress;
