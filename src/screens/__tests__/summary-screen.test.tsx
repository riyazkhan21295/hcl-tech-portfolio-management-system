import "@testing-library/jest-dom";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SummaryScreen from "../summary-screen";

// Mock the child components
vi.mock("../../components/AllStocksTable", () => ({
  default: () => (
    <div data-testid="mock-all-stocks-table">All Stocks Table</div>
  ),
}));

vi.mock("../../components/PortfolioSummary/PortfolioSummaryTable", () => ({
  default: () => (
    <div data-testid="mock-portfolio-summary-table">
      Portfolio Summary Table
    </div>
  ),
}));

const renderSummaryScreen = () => {
  return render(
    <BrowserRouter>
      <SummaryScreen />
    </BrowserRouter>
  );
};

describe("SummaryScreen", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the component with default 'explore' tab active", async () => {
    const { getByText, getByTestId, queryByTestId } = renderSummaryScreen();

    // Check if both tab buttons are present
    expect(getByText("Explore")).toBeInTheDocument();
    expect(getByText("Holdings")).toBeInTheDocument();

    // Check if AllStocksTable is rendered by default
    expect(getByTestId("mock-all-stocks-table")).toBeInTheDocument();
    // PortfolioSummaryTable should not be visible initially
    expect(
      queryByTestId("mock-portfolio-summary-table")
    ).not.toBeInTheDocument();
  });

  it("switches to Holdings tab when clicked", async () => {
    const { getByText, getByTestId, queryByTestId } = renderSummaryScreen();
    const user = userEvent.setup();

    // Click on the Holdings tab
    await user.click(getByText("Holdings"));

    // Check if PortfolioSummaryTable is now visible
    expect(getByTestId("mock-portfolio-summary-table")).toBeInTheDocument();
    // AllStocksTable should not be visible
    expect(queryByTestId("mock-all-stocks-table")).not.toBeInTheDocument();
  });

  it("switches back to Explore tab when clicked", async () => {
    const { getByText, getByTestId, queryByTestId } = renderSummaryScreen();
    const user = userEvent.setup();

    // First switch to Holdings tab
    await user.click(getByText("Holdings"));
    // Then switch back to Explore tab
    await user.click(getByText("Explore"));

    // Check if AllStocksTable is visible again
    expect(getByTestId("mock-all-stocks-table")).toBeInTheDocument();
    // PortfolioSummaryTable should not be visible
    expect(
      queryByTestId("mock-portfolio-summary-table")
    ).not.toBeInTheDocument();
  });
});
