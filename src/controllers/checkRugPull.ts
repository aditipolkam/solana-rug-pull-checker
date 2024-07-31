import { Request, Response } from 'express';
import { getTokenMetadata, getTokenAccountBalance, getAccountInfo } from '../helpers';

const checkRugPull = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;

    const metadata = await getTokenMetadata(address);
    const account = await getAccountInfo(address);
    // const tokenAccBalance = await getTokenAccountBalance('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

    return res.status(200).json({ metadata, account });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default checkRugPull;
