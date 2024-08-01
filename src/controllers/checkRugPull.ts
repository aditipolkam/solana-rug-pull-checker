import { Request, Response } from 'express';
import {
  getTokenMetadata,
  getTokenAccountBalance,
  getAccountInfo,
  getTokenSupply,
  getTokenLargestAccounts,
  getDeployerAddress,
  getLPMintAddress,
  getRemainingLPTokens,
} from '../helpers';

const checkRugPull = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;

    const metadata = await getTokenMetadata(address);
    const account = await getAccountInfo(address);
    // const tokenAccBalance = await getTokenAccountBalance('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

    const totalSupply = await getTokenSupply(address);
    const largestAccounts = await getTokenLargestAccounts(address);
    const totalTop10 = largestAccounts
      // .slice(10)
      .reduce((sum: number, holder: any) => sum + holder.uiAmount, 0);

    const percentage = ((totalTop10 / totalSupply) * 100).toFixed(2);
    console.log(`Total supply: ${totalSupply}`);
    console.log(`Top 20 holders hold: ${totalTop10}`);
    console.log(`which is ${percentage}% of the total supply`);

    const deployerAddress = await getDeployerAddress(address);
    const lpMintAddress = await getLPMintAddress(address);

    const remainingLp = await getRemainingLPTokens(address);

    return res.status(200).json({ metadata, account, deployerAddress, lpMintAddress, remainingLp });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default checkRugPull;
