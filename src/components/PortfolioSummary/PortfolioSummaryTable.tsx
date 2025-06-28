/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag } from "antd";
import { useAuth } from "../../contexts/auth-context";
import useStockTransaction from "../../states/useStockTransaction";
import useStocks from "../../states/useStocks";
import { formatCurrency } from "../../utils";

const PortfolioSummaryTable = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const { getStockById } = useStocks();

  const { getStockTransactionsByUserId } = useStockTransaction();
  const stockTransactions = getStockTransactionsByUserId(userId!);

  const filteredStockTransactions = stockTransactions.filter(
    (transaction: any) => {
      return transaction.order_status === "Completed";
    }
  );

  const columns = getColumns({ getStockById });

  return (
    <Table
      columns={columns}
      dataSource={filteredStockTransactions}
      pagination={false}
    />
  );
};

export default PortfolioSummaryTable;

const getColumns = ({ getStockById }: any) => [
  {
    key: "created_on",
    title: "Order Date",
    render: (value: any) => value.created_on,
  },
  {
    key: "order_ref_no",
    title: "Order Ref No.",
    render: (value: any) => value.order_ref_no,
  },
  {
    key: "id_security_detail",
    title: "Stock Name",
    render: (value: any) => getStockById(value.id_security_detail)?.name,
  },
  {
    key: "transaction_type",
    title: "Transaction Type",
    render: (value: any) => (
      <Tag color={value.transaction_type === "BUY" ? "green" : "red"}>
        {value.transaction_type}
      </Tag>
    ),
  },
  {
    key: "credit",
    title: "Credit",
    render: (value: any) =>
      value.transaction_type === "BUY" && formatCurrency(value.order_value),
  },
  {
    key: "debit",
    title: "Debit",
    render: (value: any) =>
      value.transaction_type === "SELL" && formatCurrency(value.order_value),
  },
];
