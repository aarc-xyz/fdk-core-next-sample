# Aarc's Fund Kit SDK Next.js Sample App

This sample application demonstrates how to integrate and use the Aarc SDK in a Next.js project. Specifically, it showcases the usage of two key functions: `performDeposit` (for bridging funds) and `performCheckout` (for calling contracts on different chains).

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A basic understanding of Next.js and React

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/your-username/aarc-sdk-nextjs-sample.git
   ```

2. Navigate to the project directory:
   ```
   cd aarc-sdk-nextjs-sample
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
   or 
   ```
   pnpm install
   ```

## Usage

### Creating AarcCore Instance

To use the Aarc SDK, you need to create an instance of the `AarcCore` class. You can do this by passing your Aarc API key as an argument to the constructor.

```javascript
import { AarcCore } from "@aarc-xyz/core";

const aarcSDK = new AarcCore('YOUR_API_KEY');
```

### performCheckout (Calling a Contract)

The `performCheckout` function enables cross-chain contract calls. It allows users to interact with contracts on different chains from where their funds are located.

```javascript
import { encodeFunctionData } from "viem";
import { arbitrum, polygon } from "viem/chains";

const callContract = async () => {
  const destinationPayload = encodeFunctionData({
    abi: ABI, // YOUR_ABI
    functionName: "mint",
    args: ["0x3039e4a4a540F35ae03A09f3D5A122c49566f919", 1000000000000],
  });

  const [address] = await wallet.requestAddresses();

  const aarcSDK = new AarcCore('YOUR_AARC_API_KEY');

  const tx = await aarcSDK.performCheckout({
    toChainId: polygon.id,
    fromChainId: arbitrum.id,
    routeType: "Value",
    destinationPayload,
    destinationGasLimit: 2000000,
    fromAddress: address,
    toTokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    fromTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    targetContractAddress: "0x6D8473f39AB16b7aE854d90acDcCDC83fa3A32b4",
    senderSigner: wallet, // wallet_signer
    toAmount: "50000",
  });

  console.log("tx", tx);
};
```

### performDeposit (Bridging Funds)

The `performDeposit` function allows you to bridge funds between different chains.

```javascript
import { arbitrum, base } from "viem/chains";

const bridgeFunds = async () => {
  const aarcSDK = new AarcCore('YOUR_AARC_API_KEY');

  const tx = await aarcSDK.performDeposit({
    toChainId: base.id,
    fromChainId: arbitrum.id,
    routeType: "Value",
    userAddress: address,
    toTokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    fromTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    senderSigner: wallet, // wallet_signer
    fromAmount: "500000", 
    recipient: address,
  });

  console.log("tx", tx);
};
```