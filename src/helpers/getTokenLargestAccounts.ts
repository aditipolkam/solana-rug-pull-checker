import makeRequest from '../utils/makeRequest';

async function getTokenLargestAccounts(mintAddress: string) {
  const params = [mintAddress];
  const result = await makeRequest('getTokenLargestAccounts', params);
  if (result && result.result) {
    return result.result.value;
  }
  return null;
}

export default getTokenLargestAccounts;
