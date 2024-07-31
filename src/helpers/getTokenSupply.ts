import makeRequest from '../utils/makeRequest';

async function getTokenSupply(mintAddress: string) {
  const params = [mintAddress];
  const result = await makeRequest('getTokenSupply', params);
  if (result && result.result) {
    const supply = result.result.value.uiAmount;
    return supply;
  }
  return null;
}

export default getTokenSupply;
