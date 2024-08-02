import { Request, Response } from 'express';
import {
  getTokenAccountBalance,
  getAccountInfo,
  getTokenSupply,
  getTokenLargestAccounts,
  getDeployerAddress,
  getLPMintAddress,
  getRemainingLPTokens,
  getLPTotalSupplyAndDeployerBalance,
  checkDeployerHistory,
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

    // let metadata: Metadata, token: Token;
    //   account,
    //   largestAccounts,
    //   deployerAddress,
    //   lpDetails,
    //   totalSupply = 0;

    const { metadata, token } = await getTokenDetails(address);
    // .then((details) => {
    //   (metadata = details.metadata), (token = details.token);
    // });

    const account = await getAccountInfo([address, { encoding: 'base58' }]);

    const totalSupply = (await getTokenSupply(address)) || 0;
    const largestAccounts = await getTokenLargestAccounts(address);

    const deployerAddress = await getDeployerAddress(address);
    const lpDetails = await getLpDetails(address);

    const totalTop10 = largestAccounts.slice(10).reduce((sum: number, holder: any) => sum + holder.uiAmount, 0);
    const topHoldersShare = totalSupply ? parseFloat(((totalTop10 / totalSupply) * 100).toFixed(2)) : null;

    const totalMarketLiquidity = lpDetails?.totalMarketLiquidity;

    const currentLpSupply = lpDetails.markets.reduce((sum: number, market: Market) => {
      return sum + (market?.mint?.lpCurrentSupply || 0);
    }, 0);
    const deployerHistory = await checkDeployerHistory(deployerAddress);

    // const lpMintAddress = await getLPMintAddress(address, deployerAddress);
    // const remainingLp = await getRemainingLPTokens(address);

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
    return res.status(200).json({
      mint: address,
      tokenProgram: account.owner,
      ...token,
      deployer: deployerAddress,
      analysis: {
        potentialRug,
        riskScoreOutOf100: riskScore,
        updatedAt: Date.now(),
        reasons,
      },
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
