import { create } from "zustand";

import SECURITY_DETAIL from "../data/SECURITY_DETAIL.json";

type TStock = {
  id: number;
  name: string;
  symbol: string;
  amount: number;
};

type UseStocks = {
  stocks: TStock[];
  getStockById: (id: number) => TStock | undefined;
};

const useStocks = create<UseStocks>((set, get) => ({
  stocks: SECURITY_DETAIL,
  getStocks: () => {
    const { stocks } = get();
    return stocks;
  },
  getStockById: (id: number) => {
    const { stocks } = get();
    return stocks.find((stock) => stock.id === id);
  },
}));

export default useStocks;
