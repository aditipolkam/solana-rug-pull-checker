import makeRPCRequest from '../utils/makeRPCRequest';

const getTransaction = async (signature: string) => {
  try {
    const params = [signature, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }];
    const txn = await makeRPCRequest('getTransaction', params);
    return txn.result || null;
  } catch (error) {
    return null;
  }
};

export default getTransaction;
