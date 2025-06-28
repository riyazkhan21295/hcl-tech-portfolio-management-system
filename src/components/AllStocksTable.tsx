/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Input, Modal, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import useStocks from "../states/useStocks";
import useStockTransaction from "../states/useStockTransaction";
import { formatCurrency } from "../utils";
import BuyStock from "./order/buy-stock/but-stock";

const AllStocksTable = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const userId = user?.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState<any>(null);
  const [search, setSearch] = useState("");

  const { stocks, getStockById } = useStocks();

  const filteredStocks = search.trim()
    ? stocks.filter((stock) => {
        return stock.name.toLowerCase().includes(search.toLowerCase());
      })
    : stocks;

  const selectedStock = selectedStockId && getStockById(selectedStockId);

  const { getStockTransactionsByStockId } = useStockTransaction();

  const columns = getColumns({
    getStockTransactionsByStockId: (stockId: number) =>
      getStockTransactionsByStockId(stockId, userId!),
    navigate,
    setIsModalOpen,
    setSelectedStockId,
  });

  return (
    <>
      <Flex vertical gap={8}>
        <Input
          size="large"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Table
          columns={columns}
          dataSource={filteredStocks}
          pagination={{ pageSize: 8 }}
        />
      </Flex>

      <Modal
        // title="BUY Stock"
        open={isModalOpen}
        // onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <BuyStock
          {...(selectedStock && {
            stock: {
              id: selectedStock.id,
              name: selectedStock.name,
              price: selectedStock.amount,
            },
          })}
          onComplete={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default AllStocksTable;

const getColumns = ({
  getStockTransactionsByStockId,
  navigate,
  setIsModalOpen,
  setSelectedStockId,
}: any) => [
  {
    key: "name",
    title: "Stock Name",
    render: (value: any) => (
      <div onClick={() => navigate(`/create-order?stockId=${value.id}`)}>
        {value?.name}
      </div>
    ),
  },
  {
    key: "amount",
    title: "Amount",
    render: (value: any) => formatCurrency(value?.amount),
  },
  {
    key: "quantity",
    title: "Quantity",
    render: (value: any) => getStockTransactionsByStockId(value?.id)?.length,
  },
  {
    key: "action",
    render: (value: any) => {
      return (
        <Flex>
          <Button
            onClick={() => {
              setSelectedStockId(value?.id);
              setIsModalOpen(true);
            }}
          >
            BUY
          </Button>
        </Flex>
      );
    },
  },
];
