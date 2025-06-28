

import React from 'react';
import { Table, Tag } from 'antd';

const formatCurrency = (value: number | string) => `$${parseFloat(value as string).toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`;

interface PortfolioSummaryData {
  orderDate: string;
  orderRefNo: string;
  fundName: string;
  transactionType: string;
  credit: number | string;
  debit: number | string;
  runningBalance: number | string;
}

interface PortfolioSummaryTableProps {
  data: PortfolioSummaryData[];
}

const PortfolioSummaryTable: React.FC<PortfolioSummaryTableProps> = ({ data }) => {
  const columns = getColumns();

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      rowKey="orderRefNo"
      bordered
    />
  );
};

export default PortfolioSummaryTable;

const getColumns = () => [
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Order Ref No.',
      dataIndex: 'orderRefNo',
      key: 'orderRefNo',
    },
    {
      title: 'Fund Name',
      dataIndex: 'fundName',
      key: 'fundName',
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (type: string) => (
        <Tag color={type === 'Buy' ? 'green' : 'red'}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      key: 'credit',
      render: (value: number | string) => formatCurrency(value),
    },
    {
      title: 'Debit',
      dataIndex: 'debit',
      key: 'debit',
      render: (value: number | string) => formatCurrency(value),
    },
    {
      title: 'Running Balance',
      dataIndex: 'runningBalance',
      key: 'runningBalance',
      render: (value: number | string) => formatCurrency(value),
    },
  ];
