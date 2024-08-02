import makeRPCRequest from '../utils/makeRPCRequest';

const getAccountInfo = async (params: unknown) => {
  // const params = [address, { encoding: 'base58' }];
  const result = await makeRPCRequest('getAccountInfo', params);
  if (result && result.result && result.result.value) {
    return result.result.value;
  }
  return null;
};

export default getAccountInfo;
