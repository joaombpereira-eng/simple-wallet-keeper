import { PasswordPrompt } from "../components/PasswordPrompt";
import { WalletCard } from "../components/WalletCard";
import { WalletGenerator } from "../components/WalletGenerator";
import { usePassordPrompt } from "../hooks/usePasswordPrompt";
import { useWalletManager } from "../hooks/useWalletManager";
import { provider } from "../lib/provider";
import { HDNodeWallet } from "ethers";
import { isEmpty } from "lodash";
import toast from "react-hot-toast";

export default function SimpleWalletKeeperApp() {
  const { wallets, addWallet, decryptWallet, fetchBalance } =
    useWalletManager();

  const {
    promptTitle,
    promptVisible,
    onPromptConfirm,
    showPrompt,
    hidePrompt,
  } = usePassordPrompt();

  const handleWalletGenerated = async (wallet: HDNodeWallet) => {
    showPrompt("Enter a password to encrypt the wallet", async (password) => {
      await addWallet(wallet, password);
      toast.success("Wallet generated!");
    });
  };

  const handleDecrypt = async (i: number) => {
    showPrompt("Enter password to decrypt wallet", async (password) => {
      await decryptWallet(i, password);
    });
  };

  const handleCheckBalance = async (i: number) => {
    await fetchBalance(i, provider);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
        <div className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-blue-800">
            Simple Wallet Keeper
          </h1>

          <WalletGenerator onWalletGenerated={handleWalletGenerated} />

          {!isEmpty(wallets) && (
            <>
              <h2 className="text-xl font-semibold mt-6">Wallets</h2>
              <ul className="space-y-4">
                {wallets.map((wallet, index) => (
                  <WalletCard
                    wallet={wallet}
                    index={index}
                    handleCheckBalance={() => handleCheckBalance(index)}
                    handleDecrypt={() => handleDecrypt(index)}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {promptVisible && (
        <PasswordPrompt
          title={promptTitle}
          onConfirm={onPromptConfirm}
          onCancel={hidePrompt}
        />
      )}
    </>
  );
}
