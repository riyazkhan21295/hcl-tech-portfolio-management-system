import { Table } from "antd";
import useTransectionHistory from "../hooks/useTransectionHistory";
import { OrderStatus, TransectionStatus } from "../library/enum";
import { formatDateToDMY } from "../library/helper";

const TransectionHistory = () => {
  const { transectionData } = useTransectionHistory();

  return (
    <Table dataSource={transectionData} columns={getColumnData()} rowKey="id" />
  );
};

export default TransectionHistory;

const getColumnData = () => [
  {
    title: "Order Reference",
    dataIndex: "order_ref_no",
    key: "order_ref_no",
    reder: (text: string) => <span>{text}</span>,
  },
  {
    title: "Stock Name",
    dataIndex: "symbol",
    key: "symbol",
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: "Transection Type",
    dataIndex: "transaction_type",
    key: "transaction_type",
    render: (text: string) => (
      <span
        className={`border px-2 py-1 rounded  ${
          text === TransectionStatus.BUY
            ? "border-yellow-500 text-yellow-500"
            : "border-green-500 text-green-500"
        }`}
      >
        {text}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "order_status",
    key: "order_status",
    render: (text: string) => (
      <span
        className={`border px-2 py-1 rounded ${
          text === OrderStatus.Cancelled
            ? "border-red-500 text-red-500"
            : "border-green-500 text-green-500"
        }`}
      >
        {text}
      </span>
    ),
  },
  {
    title: "Ordered Value",
    dataIndex: "order_value",
    key: "order_value",
    render: (text: string) => (
      <span className="flex  justify-center">{text}</span>
    ),
  },
  {
    title: "Ordered Date",
    dataIndex: "created_on",
    key: "created_on",
    render: (text: string) => <span>{formatDateToDMY(text)}</span>,
  },
];
