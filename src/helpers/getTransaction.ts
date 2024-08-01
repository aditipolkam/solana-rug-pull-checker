import makeRequest from '../utils/makeRequest';

const getTransaction = async (signature: string) => {
  const params = [signature, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }];
  const txn = await makeRequest('getTransaction', params);
  return txn.result || null;
};

export default getTransaction;
