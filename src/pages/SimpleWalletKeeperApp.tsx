import { useCallback, useEffect, useMemo } from "react";
import { PasswordPrompt } from "../components/PasswordPrompt";
import { WalletCard } from "../components/WalletCard";
import { WalletGenerator } from "../components/WalletGenerator";
import { usePasswordPrompt } from "../hooks/usePasswordPrompt";
import { useWalletManager } from "../hooks/useWalletManager";
import { HDNodeWallet, JsonRpcProvider } from "ethers";
import { isEmpty, isNil } from "lodash";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CHAINS } from "../contants/chain";
import { setChain } from "../store/chainSlice";

export default function SimpleWalletKeeperApp() {
  const dispatch = useAppDispatch();

  const selectedChain = useAppSelector((state) => state.chain.selectedChain);

  const provider = useMemo(() => {
    return new JsonRpcProvider(selectedChain.rpcUrl);
  }, [selectedChain]);

  const { wallets, addWallet, decryptWallet, fetchBalance } =
    useWalletManager();

  const {
    promptTitle,
    promptVisible,
    onPromptConfirm,
    showPrompt,
    hidePrompt,
  } = usePasswordPrompt();

  const handleWalletGenerated = async (wallet: HDNodeWallet) => {
    showPrompt("Enter a password to encrypt the wallet", async (password) => {
      await addWallet(wallet, password);
      toast.success("Wallet generated!");
    });
  };

  const handleDecrypt = useCallback(
    (i: number) => {
      return () => {
        showPrompt("Enter password to decrypt wallet", async (password) => {
          await decryptWallet(i, password);
        });
      };
    },
    [decryptWallet, showPrompt]
  );

  const handleCheckBalance = useCallback(
    (i: number) => {
      return async () => {
        await fetchBalance(i, provider);
      };
    },
    [fetchBalance, provider]
  );

  const walletList = useMemo(() => {
    return (
      <ul className="space-y-4">
        {wallets.map((wallet, index) => (
          <WalletCard
            wallet={wallet}
            index={index}
            handleCheckBalance={handleCheckBalance(index)}
            handleDecrypt={handleDecrypt(index)}
            key={index}
            selectedChain={selectedChain}
          />
        ))}
      </ul>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets, selectedChain]);

  const handleChainSelection = (chainName: string) => {
    const chain = CHAINS.find((c) => c.name === chainName);
    if (chain) dispatch(setChain(chain));
  };

  useEffect(() => {
    wallets.forEach((wallet, index) => {
      if (!isNil(wallet.balance)) {
        fetchBalance(index, provider);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChain]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
        <div className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-blue-800">
            Simple Wallet Keeper
          </h1>

          <WalletGenerator onWalletGenerated={handleWalletGenerated} />

          <select
            value={selectedChain.name}
            className="mt-4 mb-6 border-blue-800 border-2 rounded-lg p-2"
            onChange={(e) => handleChainSelection(e.target.value)}
          >
            {CHAINS.map((chain) => (
              <option key={chain.id} value={chain.name}>
                {chain.name}
              </option>
            ))}
          </select>

          {!isEmpty(wallets) && (
            <>
              <h2 className="text-xl font-semibold mt-6">Wallets</h2>
              {walletList}
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
