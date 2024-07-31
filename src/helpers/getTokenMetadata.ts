import { PublicKey } from '@solana/web3.js';
import { connection, metaplex } from '../config/rpcConnectionConfig';

const getTokenMetadata = async (tokenAddress: string) => {
  const mintAddress = new PublicKey(tokenAddress);

  let tokenName;
  let tokenSymbol;
  let tokenLogo;
  let mintAuthorityEnabled;

  const metadataAccount = metaplex.nfts().pdas().metadata({ mint: mintAddress });

  const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

  if (metadataAccountInfo) {
    const token = await metaplex.nfts().findByMint({ mintAddress: mintAddress });
    tokenName = token.name;
    tokenSymbol = token.symbol;
    tokenLogo = token.json?.image;
    mintAuthorityEnabled = token.mint.mintAuthorityAddress ? true : false;
  }

  return { tokenLogo, tokenName, tokenSymbol, mintAuthorityEnabled };
};

export default getTokenMetadata;
