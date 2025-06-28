import { Chain } from "../contants/chain";
import { LoadingSpinner } from "../assets/LoadingSpinner";
import { StoredWallet } from "@/hooks/useWalletManager";
import React from "react";

type Props = {
  wallet: StoredWallet; // The wallet to display
  index: number; // Index of the wallet in the list
  handleCheckBalance: (index: number) => Promise<void>; // Function to check balance
  handleDecrypt: (index: number) => void; // Function to decrypt wallet
  selectedChain: Chain;
};

export const WalletCard = ({
  wallet,
  index,
  handleCheckBalance,
  handleDecrypt,
  selectedChain,
}: Props): React.ReactElement => {
  return (
    <li key={index} className="border rounded-lg p-4 shadow-sm bg-gray-50">
      <p>
        <strong>Address:</strong>{" "}
        <span className="break-all">{wallet.address}</span>
      </p>

      {wallet.privateKey && (
        <p className="text-sm text-green-600 mt-2">
          <strong>Private Key:</strong> {wallet.privateKey}
        </p>
      )}

      {wallet.loading ? (
        <div className="flex flex-row mr-2 items-center">
          <LoadingSpinner />
          <p className="ml-2">Checking balance...</p>
        </div>
      ) : wallet.balance ? (
        <p className="text-sm text-blue-600 mt-2">
          Balance shown for <strong>{selectedChain.name}: </strong>
          {wallet.balance} ETH
        </p>
      ) : (
        <button className="flex flex-row text-sm text-blue-700 underline mt-2">
          {"Check Balance"}
        </button>
      )}

      {!wallet.privateKey && (
        <button
          onClick={() => handleDecrypt(index)}
          className="block text-sm text-purple-700 underline mt-2"
        >
          View Private Key
        </button>
      )}
    </li>
  );
};
