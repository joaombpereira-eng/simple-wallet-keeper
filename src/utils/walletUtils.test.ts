import { decryptWallet, encryptWallet, generateWallet } from "./walletUtils";
import { ethers } from "ethers";

describe("Wallet Utilities", () => {
  const testPrivateKey =
    "0x59c6995e998f97a5a0044976fbedb8dd77e7c3af3e6eb90f97ec99b02e3dc639";
  const password = "superSecret";

  it("should generate a valid wallet", () => {
    const wallet = generateWallet();
    expect(wallet.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(wallet.privateKey).toMatch(/^0x[a-fA-F0-9]{64}$/);
  });

  it("encrypts and decrypts a wallet correctly", async () => {
    const wallet = new ethers.Wallet(testPrivateKey);

    const encryptedJson = await wallet.encrypt(password);
    expect(typeof encryptedJson).toBe("string");
    expect(encryptedJson.length).toBeGreaterThan(100); // Rough length check

    const decryptedWallet = await ethers.Wallet.fromEncryptedJson(
      encryptedJson,
      password
    );

    expect(decryptedWallet.privateKey).toBe(testPrivateKey);
    expect(decryptedWallet.address).toBe(wallet.address);
  });

  it("fails to decrypt with incorrect password", async () => {
    const wallet = new ethers.Wallet(testPrivateKey);
    const encryptedJson = await wallet.encrypt(password);

    await expect(
      ethers.Wallet.fromEncryptedJson(encryptedJson, "wrongPassword")
    ).rejects.toThrow();
  });
});
