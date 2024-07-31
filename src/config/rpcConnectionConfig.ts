import { Metaplex } from '@metaplex-foundation/js';
import { Connection } from '@solana/web3.js';
import { SOLANA_RPC } from './constants';

export const connection = new Connection(SOLANA_RPC);
export const metaplex = Metaplex.make(connection);
