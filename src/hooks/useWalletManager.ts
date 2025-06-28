import { ethers, HDNodeWallet, Wallet } from "ethers";
import toast from "react-hot-toast";
import {
  addWallet as addWalletAction,
  setLoading,
  updateWallet,
} from "../store/walletsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export type StoredWallet = {
  address: string;
  encryptedJson: string;
  privateKey?: string; //Optional - only set after decryption
  balance?: string; //in ETH (string for easy formatting)
  loading?: boolean;
};

export const useWalletManager = () => {
  const dispatch = useAppDispatch();

  const wallets = useAppSelector((state) => state.wallets.list);

  const addWallet = async (wallet: HDNodeWallet, password: string) => {
    const encryptedJson = await wallet.encrypt(password);

    const storedWallet: StoredWallet = {
      address: wallet.address,
      encryptedJson,
    };

    dispatch(addWalletAction(storedWallet));
  };

  const decryptWallet = async (index: number, password: string) => {
    try {
      const encrypetdJson = wallets[index].encryptedJson;
      const decryptedWallet = await Wallet.fromEncryptedJson(
        encrypetdJson,
        password
      );

      dispatch(
        updateWallet({
          index,
          wallet: { ...wallets[index], privateKey: decryptedWallet.privateKey },
        })
      );
    } catch (e) {
      toast.error("Failed to decrypt wallet. Please check your password.");
    }
  };

  const fetchBalance = async (index: number, provider: ethers.Provider) => {
    dispatch(setLoading({ index, loading: true }));

    try {
      const rawBalance = await provider.getBalance(wallets[index].address); //Returns balance in wei
      const ethBalance = ethers.formatEther(rawBalance); //Convert wei to ETH

      dispatch(
        updateWallet({
          index,
          wallet: { ...wallets[index], balance: ethBalance },
        })
      );
    } catch (e) {
      toast.error("Failed to fetch balance.");
    } finally {
      dispatch(setLoading({ index, loading: false }));
    }
  };

  return {
    wallets,
    addWallet,
    decryptWallet,
    fetchBalance,
  };
};
