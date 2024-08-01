import { PublicKey } from '@solana/web3.js';
import getTransaction from './getTransaction';
import { connection } from '../config/rpcConnectionConfig';

async function checkDeployerHistory(deployer: string) {
  try {
    const deployerAddress = new PublicKey(deployer);

    // Fetch all confirmed transactions for the deployer address
    const transactions = await connection.getSignaturesForAddress(
      deployerAddress,
      { limit: 10 }, // Adjust limit as needed
    );
    console.log({ transactions });

    // Analyze transactions for suspicious patterns
    for (const tx of transactions) {
      const transactionDetails = await getTransaction(tx.signature);
      console.log({ transactionDetails });
      if (transactionDetails) {
        // Check for large token transfers, especially to unknown or new addresses
        // Analyze program instructions for suspicious activity
        const instructions = transactionDetails.transaction.message.instructions;
        for (const ix of instructions) {
          // Example check for known rug-pull patterns (e.g., withdrawing liquidity)
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
