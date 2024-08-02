import { PublicKey } from '@solana/web3.js';
import getTransaction from './getTransaction';
import { connection } from '../config/rpcConnectionConfig';

async function checkDeployerHistory(deployer: string) {
  try {
    const deployerAddress = new PublicKey(deployer);

    // fetch all confirmed transactions for the deployer address
    const transactions = await connection.getSignaturesForAddress(deployerAddress, { limit: 10 });

    // analyze transactions for suspicious patterns
    for (const tx of transactions) {
      const transactionDetails = await getTransaction(tx.signature);
      // console.log({ transactionDetails: JSON.stringify(transactionDetails) });
      if (transactionDetails) {
        // check for large token transfers, especially to unknown or new addresses

        // Analyze program instructions for suspicious activity
        const instructions = transactionDetails.transaction.message.instructions;
        for (const ix of instructions) {
          if (ix.programId instanceof PublicKey && ix.programId.toBase58() === 'KnownScamProgramId') {
            console.log('Potential rug pull activity detected:', tx.signature);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching or analyzing transactions:', error);
  }
}
export default checkDeployerHistory;
