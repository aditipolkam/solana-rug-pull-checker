import { PublicKey } from '@solana/web3.js';
import { connection } from '../config/rpcConnectionConfig';

async function getLPTotalSupplyAndDeployerBalance(lpMintAddress: string, deployerAddress: string) {
  try {
    const deployerPublicKey = new PublicKey(deployerAddress);
    const lpMintAddressPublicKey = new PublicKey(lpMintAddress);

    // get total supply of LP tokens
    const lpSupplyResult = await connection.getTokenSupply(lpMintAddressPublicKey);
    const totalSupply = lpSupplyResult.value.uiAmount;

    // get deployer's balance of LP tokens
    const deployerTokenAccounts = await connection.getParsedTokenAccountsByOwner(deployerPublicKey, {
      mint: lpMintAddressPublicKey,
    });
    let deployerBalance = 0;

    deployerTokenAccounts.value.forEach(({ account }) => {
      deployerBalance += account.data.parsed.info.tokenAmount.uiAmount;
    });

    // calculate the percentage of LP tokens held by the deployer
    const deployerPercentage = totalSupply ? (deployerBalance / totalSupply) * 100 : null;

    return {
      totalSupply,
      deployerBalance,
      deployerPercentage,
    };
  } catch (error) {
    console.error('Error fetching LP token data:', error);
    return null;
  }
}

export default getLPTotalSupplyAndDeployerBalance;
