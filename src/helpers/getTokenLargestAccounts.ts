import makeRPCRequest from '../utils/makeRPCRequest';

async function getTokenLargestAccounts(mintAddress: string) {
  const params = [mintAddress];
  const result = await makeRPCRequest('getTokenLargestAccounts', params);
  if (result && result.result) {
    return result.result.value;
  }
  return null;
}

export default getTokenLargestAccounts;
