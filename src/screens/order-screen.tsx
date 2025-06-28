import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const OrderScreen: React.FC = () => {
  const handleTabChange = (key: string) => {
    console.log(`Active Tab: ${key}`);
    // Future enhancement: call context or API logic based on tab
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 shadow rounded-2xl ">
      <Tabs
        defaultActiveKey="buy"
        onChange={handleTabChange}
        className="custom-tabs"
        centered
        animated
      >
        <TabPane tab="Buy" key="buy">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 text-base md:text-lg text-gray-700">
              {/* Replace this with Buy form or content */}
              <p className="text-center md:text-left ">
                Buy Tab Content: Book your purchase orders here.
              </p>
            </div>
          </div>
        </TabPane>

        <TabPane tab="Sell" key="sell">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 text-base md:text-lg text-gray-700">
              {/* Replace this with Sell form or content */}
              <p className="text-center md:text-left">
                Sell Tab Content: Place your sell orders here.
              </p>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OrderScreen;
