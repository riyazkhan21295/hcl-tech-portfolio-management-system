import type { Order } from '../types/order.type';
import type { SecurityDetail } from '../types/security-detail.type';
import SecurityDetails from '../data/SECURITY_DETAIL.json';
import OrderDetails from '../data/ORDER_DETAILS.json';

// type OrderWithSecurity = Order & Omit<SecurityDetail, 'id' | 'name'>;
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

  return {
    transectionData: mergeOrdersWithStockDetails(OrderDetails, SecurityDetails),
  };
};

export default useTransectionHistory;
