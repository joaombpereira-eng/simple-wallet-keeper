import { ethers, HDNodeWallet } from "ethers";
import React from "react";

type Props = {
  onWalletGenerated: (wallet: HDNodeWallet) => void;
};

export const WalletGenerator = ({
  onWalletGenerated,
}: Props): React.ReactElement => {
  const handleGenerateWallet = () => {
    const wallet = ethers.Wallet.createRandom(); //Create a new wallet
    onWalletGenerated(wallet); // Send it to the parent component
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800 transition"
        onClick={handleGenerateWallet}
      >
        Generate Wallet
      </button>
    </div>
  );
};
