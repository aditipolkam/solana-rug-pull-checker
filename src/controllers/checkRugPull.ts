import { Request, Response } from 'express';
import {
  // getTokenAccountBalance,
  getAccountInfo,
  getTokenSupply,
  getTokenLargestAccounts,
  getDeployerAddress,
  // getLPMintAddress,
  // getRemainingLPTokens,
  // getLPTotalSupplyAndDeployerBalance,
  // checkDeployerHistory,
  getTokenDetails,
} from '../helpers';
import getLpDetails from '../utils/getLpDetails';

interface Market {
  mint: {
    lpCurrentSupply: number;
  };
}

const checkRugPull = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const reasons: string[] = [];
    let potentialRug = false;
    let riskScore = 0;

    //get token metadata and details
    const { metadata, token } = await getTokenDetails(address);

    // get token account details
    const account = await getAccountInfo([address, { encoding: 'base58' }]);

    // get total supply of token
    const totalSupply = (await getTokenSupply(address)) || 0;

    //determine the largest token holders
    const largestAccounts = await getTokenLargestAccounts(address);

    //get the deployer address
    const deployerAddress = await getDeployerAddress(address);

    // get liquidity pool details
    const lpDetails = await getLpDetails(address);
    const totalMarketLiquidity = lpDetails?.totalMarketLiquidity;

    // get deployer transaction history
    // const deployerHistory = await checkDeployerHistory(deployerAddress);

    // const lpMintAddress = await getLPMintAddress(address, deployerAddress);
    // const remainingLp = await getRemainingLPTokens(address);

    // calculate metrics
    const totalTop10 = largestAccounts
      .slice(10)
      .reduce((sum: number, holder: { uiAmount: number }) => sum + holder.uiAmount, 0);
    const topHoldersShare = totalSupply ? parseFloat(((totalTop10 / totalSupply) * 100).toFixed(2)) : null;
    const currentLpSupply = lpDetails.markets.reduce((sum: number, market: Market) => {
      return sum + (market?.mint?.lpCurrentSupply || 0);
    }, 0);

    // const result = await getLPTotalSupplyAndDeployerBalance(lpMintAddress, deployerAddress);
    // if (result) {
    //   console.log(`Total Supply of LP Tokens: ${result.totalSupply}`);
    //   console.log(`Deployer's LP Token Balance: ${result.deployerBalance}`);
    //   console.log(
    //     `Deployer's Percentage of LP Tokens: ${result.deployerPercentage ? result.deployerPercentage.toFixed(2) : null}%`,
    //   );

    //   if (result?.deployerPercentage && result?.deployerPercentage > 50) {
    //     console.log('The deployer holds the majority of the LP tokens.');
    //   } else {
    //     console.log('The deployer does not hold the majority of the LP tokens.');
    //   }
    // }

    // calculate riskscore
    if (token?.mintAuthority) {
      riskScore += 10;
      potentialRug = true;
      reasons.push('An account still has the authority to mint new tokens ');
    } else if (topHoldersShare && topHoldersShare > 30) {
      riskScore += 10;
      potentialRug = true;
      reasons.push('The share of tokens hold by top 20 holders is more than 30%');
    } else if (totalMarketLiquidity < 100000) {
      riskScore += 10;
      potentialRug = true;
      reasons.push('Very low liquidity available');
    } else if (currentLpSupply !== 0) {
      riskScore += 10;
      potentialRug = true;
      reasons.push('All LP tokens are not burnt');
    }

    //send final response
    return res.status(200).json({
      mint: address,
      tokenProgram: account.owner,
      ...token,
      deployer: deployerAddress,
      analysis: {
        potentialRug,
        riskScoreOutOf50: riskScore,
        updatedAt: Date.now(),
        reasons,
      },
      risks: lpDetails.risks,
      metadata,
      supply: totalSupply ? totalSupply.toFixed(2) : null,
      topHoldersShare,
      topHolders: largestAccounts,
      totalMarketLiquidity,
      currentLpSupply,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default checkRugPull;
