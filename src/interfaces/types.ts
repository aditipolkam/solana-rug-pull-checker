export interface Metadata {
  name?: string;
  symbol?: string;
  uri?: string;
  updateAuthority?: string;
  isMutable?: boolean;
}

export interface Token {
  creators?: unknown[];
  mintAuthority: string | null;
  freezeAuthority: string | null;
}

export interface Risk {
  name: string;
  value: string;
  description: string;
  score: number;
  level: 'low' | 'medium' | 'high' | 'danger';
}
