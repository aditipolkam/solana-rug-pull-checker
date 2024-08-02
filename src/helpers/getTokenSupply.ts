import makeRPCRequest from '../utils/makeRPCRequest';

async function getTokenSupply(mintAddress: string) {
  try {
    const params = [mintAddress];
    const result = await makeRPCRequest('getTokenSupply', params);
    if (result && result.result) {
      const supply = result.result.value.uiAmount;
      return supply as number;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export default getTokenSupply;
