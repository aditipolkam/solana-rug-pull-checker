import makeRPCRequest from '../utils/makeRPCRequest';

async function getTokenLargestAccounts(mintAddress: string) {
  try {
    const params = [mintAddress];
    const result = await makeRPCRequest('getTokenLargestAccounts', params);
    if (result && result.result) {
      return result.result.value;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export default getTokenLargestAccounts;
