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

const checkRugPull = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;

    const { metadata, token } = await getTokenDetails(address);
    const account = await getAccountInfo(address);
    // // const tokenAccBalance = await getTokenAccountBalance('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

    const totalSupply = await getTokenSupply(address);
    const largestAccounts = await getTokenLargestAccounts(address);
    const totalTop10 = largestAccounts
      // .slice(10)
      .reduce((sum: number, holder: any) => sum + holder.uiAmount, 0);

    const topHoldersShare = totalSupply ? ((totalTop10 / totalSupply) * 100).toFixed(2) : null;

    // const deployerAddress = await getDeployerAddress(address);
    // const lpMintAddress = await getLPMintAddress(address);

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

    // const deployerHistory = await checkDeployerHistory(deployerAddress);

    return res.status(200).json({
      mint: address,
      tokenProgram: account.owner,
      ...token,
      supply: totalSupply ? totalSupply.toFixed(2) : null,
      metadata,
      topHoldersShare,
      topHolders: largestAccounts,
      // deployerAddress,
      // lpMintAddress,
      // remainingLp
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default checkRugPull;
