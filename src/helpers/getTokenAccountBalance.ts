import makeRPCRequest from '../utils/makeRPCRequest';

// Get Token Account Balance
async function getTokenAccountBalance(tokenAccountAddress: string) {
  const params = [tokenAccountAddress];
  const result = await makeRPCRequest('getTokenAccountBalance', params);
  if (result && result.result) {
    const balance = result.result.value.uiAmount;
    return balance;
  }
  console.log(result);
  return null;
}

export default getTokenAccountBalance;
