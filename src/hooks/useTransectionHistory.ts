import type { Order } from '../types/order.type';
import type { SecurityDetail } from '../types/security-detail.type';
import SecurityDetails from '../data/SECURITY_DETAIL.json';
import OrderDetails from '../data/ORDER_DETAILS.json';

const useTransectionHistory = () => {
  function mergeOrdersWithStockDetails(
    orders: Order[],
    stocks: SecurityDetail[]
  ) {
    const stockMap = new Map(
      stocks.map((stock: SecurityDetail) => [
        stock.id,
        { symbol: stock.symbol, amount: stock.amount },
      ])
    );

    return orders.map((order) => {
      const stock = stockMap.get(order.id_security_detail);
      return {
        ...order,
        symbol: stock?.symbol ?? null,
        amount: stock?.amount ?? null,
      };
    });
  }

  const mergedData = mergeOrdersWithStockDetails(OrderDetails, SecurityDetails);

  function searchTransactions(query: string) {
    const lowerQuery = query.toLowerCase();

    return mergedData.filter((item) =>
      [item.symbol, item.transaction_type, item.order_status, item.order_ref_no]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(lowerQuery))
    );
  }

  return {
    transectionData: mergedData,
    searchTransactions,
  };
};

export default useTransectionHistory;
