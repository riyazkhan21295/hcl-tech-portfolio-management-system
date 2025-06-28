import React from "react";
import BuyStock from "../components/order/buy-stock/buy-stock";

const OrderScreen: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <BuyStock
        // stock={{
        //   id: "3",
        //   name: "Apple",
        //   price: 200,
        // }}
        onComplete={(status) => {
          console.log("Order status::", status);
        }}
      />

      {/*  <Modal open footer={null}>
        <div className="mt-8">
          <BuyStock
            onComplete={(status) => {
              console.log("Order status::", status);
            }}
          />
        </div>
      </Modal> */}
    </div>
  );
};

export default OrderScreen;
