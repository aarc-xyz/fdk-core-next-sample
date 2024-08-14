"use client";

import { ABI } from "@/utils/Abi";
import { aarcSDK, getWalletClient } from "@/utils/wallet";
import { encodeFunctionData } from "viem";
import { arbitrum, base, polygon } from "viem/chains";

export default function Home() {
  const callContract = async () => {
    const wallet = await getWalletClient();
    const destinationPayload = encodeFunctionData({
      abi: ABI,
      functionName: "mint",
      args: ["0x3039e4a4a540F35ae03A09f3D5A122c49566f919", 1000000000000],
    });

    const [address] = await wallet.requestAddresses();

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
      senderSigner: wallet as any,
      toAmount: "50000",
    });

    console.log("tx", tx);
  };

  const bridgeFunds = async () => {
    const wallet = await getWalletClient();
    const [address] = await wallet.requestAddresses();

    const tx = await aarcSDK.performDeposit({
      toChainId: base.id,
      fromChainId: arbitrum.id,
      routeType: "Value",
      userAddress: address,
      toTokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      fromTokenAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      senderSigner: wallet as any,
      fromAmount: "500000",
      recipient: address,
    });

    console.log("tx", tx);
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col items-center'>
        <span className='text-3xl'>Call contract with FDK</span>
        <button
          className='p-2 bg-slate-700 text-white rounded-lg mt-4'
          onClick={callContract}
        >
          Call Contract
        </button>
        <button
          className='p-2 bg-slate-700 text-white rounded-lg mt-4'
          onClick={bridgeFunds}
        >
          Bridge Funds
        </button>
      </div>
    </main>
  );
}
