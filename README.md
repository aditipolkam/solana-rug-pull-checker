# Rug Pull Checker

This project is a tool designed to assess the potential risk of a cryptocurrency rug pull. The tool analyzes various factors related to a token's deployment and ownership, including token distribution, liquidity, and the history of the deployer. The endpoint `/tokens/rugcheck/:address` provides an analysis based on these factors.

## Features

- **Token Analysis**: Evaluates token details, including mint authority and top holder concentration.
- **Liquidity Analysis**: Checks total market liquidity and LP token status.
- **Deployer Analysis**: Reviews the history and activity of the deployer address.

## Testing

Deployed Link: `https://solana-rug-pull-checker.onrender.com/tokens/rugcheck/<token_address>`

## Getting Started

### Prerequisites

- Node.js
- TypeScript

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aditipolkam/solana-rugpull-checker.git
   cd solana-rugpull-checker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Adding env variables
   Add `ALCHEMY_API_KEY` variable in a .env file

4. Compile TypeScript:
   ```bash
   npm run build
   ```

### Running the Server

Start the server:

```bash
npm start
```

The server will be available at `http://localhost:3000`.

## Usage

### Checking for Rug Pull

To check the potential for a rug pull, send a GET request to:

```
GET /tokens/rugcheck/:address
```

- **`address`**: The address of the token to analyze.

The response will include a risk score, potential rug pull flag, reasons for the assessment, and detailed token information.

## Example

```bash
curl http://localhost:3000/tokens/rugcheck/<token_address>
```

## Key Risk Indicators

1. **Mint Authority**: If an account still has the authority to mint new tokens, it increases the risk.
2. **Top Holder Concentration**: High concentration of tokens among top holders can indicate potential market manipulation.
3. **Market Liquidity**: Low liquidity can make it easier for a deployer to pull out funds without much resistance.
4. **LP Token Status**: If all LP tokens are not burnt, there's a risk that the deployer can pull liquidity.

## License

This project is licensed under the MIT License.
