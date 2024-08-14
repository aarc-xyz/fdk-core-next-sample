import { AarcCore } from "@aarc-dev/core";
import { createWalletClient, custom } from "viem";
import { arbitrum } from "viem/chains";

const getWalletClient = async () => {
  const [account] = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });
  const walletClient = createWalletClient({
    chain: arbitrum,
    account,
    transport: custom((window as any).ethereum!),
  });
  return walletClient;
};

const aarcSDK = new AarcCore(process.env.NEXT_PUBLIC_API_KEY!);

export { getWalletClient, aarcSDK };
