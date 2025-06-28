import { render, screen } from "@testing-library/react";
import type { ColumnsType } from "antd/es/table";
import { describe, expect, it, vi } from "vitest";
import TransectionHistory from "../transection-history";

interface TransactionRecord {
  order_ref_no: string;
  symbol: string;
  amount: string;
  transaction_type: string;
  order_status: string;
  order_value: string;
  created_on: string;
}

// Mock the custom hook
vi.mock("../hooks/useTransectionHistory", () => ({
  default: () => ({
    transectionData: [],
    searchTransactions: vi.fn(),
  }),
}));

// Mock antd components
vi.mock("antd", () => ({
  Table: ({ columns }: { columns: ColumnsType<TransactionRecord> }) => (
    <div data-testid="mock-table">
      <div data-testid="column-headers">
        {columns.map((column, index) => (
          <div key={index} data-testid="column-header">
            {typeof column.title === "function"
              ? column.title({})
              : column.title}
          </div>
        ))}
      </div>
    </div>
  ),
}));

vi.mock("antd/es/input/Search", () => ({
  default: () => <div data-testid="mock-search">Search Component</div>,
}));

describe("TransectionHistory", () => {
  const expectedColumns = [
    "Order Reference",
    "Stock Name",
    "Amount",
    "Transection Type",
    "Status",
    "Ordered Value",
    "Ordered Date",
  ];

  it("renders all expected column headers", () => {
    render(<TransectionHistory />);

    // Get all column headers
    const columnHeaders = screen.getAllByTestId("column-header");

    // Check if we have the correct number of columns
    expect(columnHeaders).toHaveLength(expectedColumns.length);

    // Check if each column header has the correct text
    columnHeaders.forEach((header, index) => {
      expect(header).toHaveTextContent(expectedColumns[index]);
    });
  });

  it("renders search component", () => {
    render(<TransectionHistory />);
    expect(screen.getByTestId("mock-search")).toBeInTheDocument();
  });

  it("renders table component", () => {
    render(<TransectionHistory />);
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });
});
