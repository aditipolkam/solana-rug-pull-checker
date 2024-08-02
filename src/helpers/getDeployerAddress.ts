import makeRPCRequest from '../utils/makeRPCRequest';

async function getDeployerAddress(tokenMintAddress: string) {
  const signaturesResponse = await makeRPCRequest('getSignaturesForAddress', [tokenMintAddress, { limit: 1 }]);
  if (signaturesResponse.result.length === 0) {
    console.log('No transactions found for this token mint address.');
    return null;
  }

  const firstSignature = signaturesResponse.result[0].signature;

  const transactionResponse = await makeRPCRequest('getTransaction', [
    firstSignature,
    { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 },
  ]);

  if (transactionResponse) {
    // Extract the deployer address from the transaction details
    const deployerAddress = transactionResponse.result.transaction.message.accountKeys[0].pubkey;
    console.log('Deployer Address:', deployerAddress);
    return deployerAddress;
  } else {
    console.log('Failed to fetch transaction details.');
    return null;
  }
}

export default getDeployerAddress;
