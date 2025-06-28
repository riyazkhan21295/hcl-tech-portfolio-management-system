import { create } from "zustand";

const DEFAULT_WALLET_AMOUNT = 10000;

type UseWallet = {
  walletAmount: number;
  updateWallet: (amount: number, type: "credit" | "debit") => void;
};

const useWallet = create<UseWallet>((set, get) => ({
  walletAmount: localStorage.getItem("walletAmount")
    ? Number(localStorage.getItem("walletAmount"))
    : DEFAULT_WALLET_AMOUNT,
  updateWallet: (amount: number, type: "buy" | "sell" | "credit" | "debit") => {
    const { walletAmount } = get();

    const newWalletAmount =
      walletAmount + (["sell", "credit"].includes(type) ? amount : -amount);
    localStorage.setItem("walletAmount", newWalletAmount.toString());

    set({ walletAmount: newWalletAmount });
  },
}));

export default useWallet;
