import axios from 'axios';
import { SOLANA_RPC } from '../config/constants';

async function makeRequest(method: string, params: unknown) {
  try {
    const response = await axios.post(
      SOLANA_RPC,
      {
        jsonrpc: '2.0',
        id: 1,
        method: method,
        params: params,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error in solanaRpcRequest:', error);
    return null;
  }
}

export default makeRequest;
