import { PublicKey } from '@solana/web3.js';
import { connection } from '../config/rpcConnectionConfig';
// const LP_MINT_ADDRESS = 'FVhJvkzTLTN6as9e447BjxaTnnUVBvyMsVs2P4SvpjCF'; // Replace with the LP token mint address
// const DEPLOYER_ADDRESS = 'E3QtCeDgopp4ccy8oeSpJ7YUQMkfZZa69tnSzxZuGJTL'; // Replace with the deployer's address

async function getLPTotalSupplyAndDeployerBalance(lpMintAddress: string, deployerAddress: string) {
  const deployerPublicKey = new PublicKey(deployerAddress);
  const lpMintAddressPublicKey = new PublicKey(lpMintAddress);

  try {
    // Get total supply of LP tokens
    const lpSupplyResult = await connection.getTokenSupply(lpMintAddressPublicKey);
    const totalSupply = lpSupplyResult.value.uiAmount;
    console.log({ totalSupply });

    // Get deployer's balance of LP tokens
    const deployerTokenAccounts = await connection.getParsedTokenAccountsByOwner(deployerPublicKey, {
      mint: lpMintAddressPublicKey,
    });
    let deployerBalance = 0;

    deployerTokenAccounts.value.forEach(({ account }) => {
      deployerBalance += account.data.parsed.info.tokenAmount.uiAmount;
    });

    // Calculate the percentage of LP tokens held by the deployer
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
