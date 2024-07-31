import makeRequest from '../utils/makeRequest';

const getAccountInfo = async (address: string) => {
  const params = [address, { encoding: 'base58' }];
  const result = await makeRequest('getAccountInfo', params);
  if (result && result.result && result.result.value) {
    return result.result.value;
  }
  return null;
};

export default getAccountInfo;
