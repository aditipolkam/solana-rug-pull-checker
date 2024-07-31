import { Request, Response } from 'express';
import getTokenMetadata from '../helpers/getTokenMetadata';

const checkRugPull = async (req: Request, res: Response) => {
  try {
    const data = await getTokenMetadata('9mQEkFVqmRJLMPUJT25qriKXi2sH8RiuMBrzLeLupump');
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default checkRugPull;
