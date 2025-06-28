import { Flex, Tabs, type TabsProps } from "antd";
import { useState } from "react";
import AllStocksTable from "../components/AllStocksTable";
import PortfolioSummaryTable from "../components/PortfolioSummary/PortfolioSummaryTable";

const SummaryScreen = () => {
  const [activeTab, setActiveTab] = useState("explore");

  const items: TabsProps["items"] = [
    {
      key: "explore",
      label: "Explore",
    },
    {
      key: "holdings",
      label: "Holdings",
    },
  ];

  return (
    <Flex vertical gap={16}>
      <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />

      {activeTab === "explore" && <AllStocksTable key={activeTab} />}
      {activeTab === "holdings" && <PortfolioSummaryTable key={activeTab} />}
    </Flex>
  );
};

export default SummaryScreen;
