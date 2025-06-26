import { useState } from "react";

export type StoredWallet = {
  address: string;
  encryptedJson: string;
  privateKey?: string; //Optional - only set after decryption
  balance?: string; //in ETH (string for easy formatting)
};

export const usePassordPrompt = () => {
  const [promptVisible, setPromptVisible] = useState<boolean>(false);
  const [onPromptConfirm, setOnPromptConfirm] = useState<
    (password: string) => void
  >(() => () => {});
  const [promptTitle, setPromptTitle] = useState<string>("Enter your password");

  const showPrompt = (title: string, callback: (pw: string) => void) => {
    setPromptTitle(title);
    setOnPromptConfirm(() => (password: string) => {
      setPromptVisible(false);
      callback(password);
    });
    setPromptVisible(true);
  };

  const hidePrompt = () => setPromptVisible(false);

  return {
    promptTitle,
    promptVisible,
    onPromptConfirm,
    showPrompt,
    hidePrompt,
  };
};
