import { useEffect } from "react";
import { testnet } from "../../../provider/Web3Modal/Web3Modal";
import { chainId } from "../../constants";

export const useSwitchNetwork = () => {
  const switchNetwork = () => {
    if (!window?.ethereum || window?.ethereum?.chainId === chainId) return;
    // @ts-ignore
    window?.ethereum?.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId,
          rpcUrls: [testnet.rpcUrl],
          chainName: testnet.name,
          nativeCurrency: {
            name: testnet.currency,
            symbol: testnet.currency,
            decimals: 18,
          },
          blockExplorerUrls: [testnet.explorerUrl],
        },
      ],
    });
  };

  useEffect(() => {
    switchNetwork();
  }, []);
};
