import React from "react";
import BuyStock from "../components/order/buy-stock/but-stock";
import useStocks from "../states/useStocks";

const OrderScreen: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const stockId = searchParams.get("stockId");

  const { getStockById } = useStocks();
  const stock = getStockById(Number(stockId));

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <BuyStock
        {...(stockId &&
          stock && {
            stock: { id: stock.id, name: stock.name, price: stock.amount },
          })}
        onComplete={(status) => {
          console.log("Order status::", status);
        }}
      />
    </div>
  );
};

export default OrderScreen;
