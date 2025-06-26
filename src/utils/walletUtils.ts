import { ethers, Wallet } from "ethers";

export const generateWallet = () => {
  const privateKey =
    "0x59c6995e998f97a5a0044976fbedb8dd77e7c3af3e6eb90f97ec99b02e3dc639";
  const wallet = new ethers.Wallet(privateKey);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
};

export const encryptWallet = async (
  wallet: Wallet,
  password: string
): Promise<string> => {
  return await wallet.encrypt(password);
};

export const decryptWallet = async (
  encryptedJson: string,
  password: string
): Promise<Wallet> => {
  return (await Wallet.fromEncryptedJson(encryptedJson, password)) as Wallet;
};
