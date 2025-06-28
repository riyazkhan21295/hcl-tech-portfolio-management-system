import { create } from "zustand";

import ORDER_DETAILS from "../data/ORDER_DETAILS.json";

type TStockTransaction = {
  id: number;
  id_security_detail: number;
  order_ref_no: string;
  order_status: string;
  transaction_type: string;
  order_value: string;
  created_on: string;
  created_by: number;
};

type UseStockTransaction = {
  stockTransactions: TStockTransaction[];
  getStockTransactionsByUserId: (userId: number) => TStockTransaction[];
  getStockTransactionsByStockId: (
    stockId: number,
    userId: number
  ) => TStockTransaction[];
};

const useStockTransaction = create<UseStockTransaction>((set, get) => ({
  stockTransactions: ORDER_DETAILS,
  getStockTransactionsByUserId: (userId: number) => {
    const { stockTransactions } = get();
    return stockTransactions.filter((transaction) => {
      return transaction.created_by === userId;
    });
  },
  addStockTransaction: (transaction: TStockTransaction) => {
    const { stockTransactions } = get();
    set({ stockTransactions: [...stockTransactions, transaction] });
  },
  getStockTransactionsByStockId: (stockId: number, userId: number) => {
    const { stockTransactions } = get();
    return stockTransactions.filter((transaction) => {
      return (
        transaction.id_security_detail === stockId &&
        transaction.created_by === userId
      );
    });
  },
}));

export default useStockTransaction;
