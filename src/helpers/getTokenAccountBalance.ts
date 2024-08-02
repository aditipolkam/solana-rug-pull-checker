import makeRPCRequest from '../utils/makeRPCRequest';

async function getTokenAccountBalance(tokenAccountAddress: string) {
  try {
    const params = [tokenAccountAddress];
    const result = await makeRPCRequest('getTokenAccountBalance', params);
    if (result && result.result) {
      const balance = result.result.value.uiAmount;
      return balance;
    }
    console.log(result);
    return null;
  } catch (error) {
    return null;
  }
}

export default getTokenAccountBalance;
