import { PublicKey } from '@solana/web3.js';
import { connection, metaplex } from '../config/rpcConnectionConfig';
import { Metadata, Token } from '../interfaces/types';

const getTokenDetails = async (tokenAddress: string) => {
  const mintAddress = new PublicKey(tokenAddress);

  const metadata: Metadata = {};
  const token: Token = {
    freezeAuthority: null,
    mintAuthority: null,
  };
  const metadataAccount = metaplex.nfts().pdas().metadata({ mint: mintAddress });

  const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

  if (metadataAccountInfo) {
    const tokenDetails = await metaplex.nfts().findByMint({ mintAddress: mintAddress });
    metadata.name = tokenDetails.name;
    metadata.symbol = tokenDetails.symbol;
    metadata.uri = tokenDetails.json?.image;
    metadata.updateAuthority = tokenDetails.updateAuthorityAddress?.toBase58();
    metadata.isMutable = tokenDetails.isMutable;

    // token.supply = tokenDetails.mint.supply.basisPoints;
    token.creators = tokenDetails.creators;
    token.freezeAuthority = tokenDetails.mint.freezeAuthorityAddress
      ? tokenDetails.mint.freezeAuthorityAddress?.toBase58()
      : null;
    token.mintAuthority = tokenDetails.mint.mintAuthorityAddress
      ? tokenDetails.mint.mintAuthorityAddress.toBase58()
      : null;
  }

  return { metadata, token };
};

export default getTokenDetails;
