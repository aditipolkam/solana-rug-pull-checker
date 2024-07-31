import makeRequest from '../utils/makeRequest';

// Get Token Account Balance
async function getTokenAccountBalance(tokenAccountAddress: string) {
  const params = [tokenAccountAddress];
  const result = await makeRequest('getTokenAccountBalance', params);
  if (result && result.result) {
    const balance = result.result.value.uiAmount;
    return balance;
  }
  console.log(result);
  return null;
}

export default getTokenAccountBalance;
