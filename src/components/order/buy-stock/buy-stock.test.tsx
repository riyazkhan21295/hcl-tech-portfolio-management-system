import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import STOCKS_JSON from "../../../data/SECURITY_DETAIL.json";
import BuyStock from "./buy-stock";

const DUMMY_STOCKS = STOCKS_JSON.map((stock) => ({
  label: `${stock?.name} - $${stock?.amount}`,
  value: stock?.name,
  price: stock?.amount,
}));

describe("BuyStock Component", () => {
  it("renders correctly with pre-selected stock prop", () => {
    const mockStock = { id: "1", name: "AAPL", price: 150 };
    render(<BuyStock stock={mockStock} />);

    expect(screen.getByText(/Buy Stock/i)).toBeInTheDocument();
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Value/i)).toBeInTheDocument();
  });

  it("renders select dropdown when stock prop is not provided", () => {
    render(<BuyStock />);
    expect(screen.getByLabelText(/Select Stock/i)).toBeInTheDocument();
  });

  it("updates quantity and calculates order value for pre-selected stock", async () => {
    const mockStock = { id: "1", name: "AAPL", price: 200 };
    render(<BuyStock stock={mockStock} />);

    const quantityInput = screen.getByRole("spinbutton", { name: /Quantity/i });
    fireEvent.change(quantityInput, { target: { value: "5" } });

    // Order value should be price * quantity = 200 * 5 = 1000
    const orderValueInput = screen.getByRole("spinbutton", {
      name: /Order Value/i,
    });
    await waitFor(() => expect(orderValueInput).toHaveValue(1000));
  });

  it("enables submit button when all inputs are valid for pre-selected stock", async () => {
    const mockOnComplete = jest.fn();
    const mockStock = { id: "1", name: "AAPL", price: 150 };
    render(<BuyStock stock={mockStock} onComplete={mockOnComplete} />);

    const submitButton = screen.getByRole("button", {
      name: /Confirm Buy Order/i,
    });
    expect(submitButton).toBeDisabled();

    const quantityInput = screen.getByRole("spinbutton", { name: /Quantity/i });
    fireEvent.change(quantityInput, { target: { value: "10" } });

    await waitFor(() => expect(submitButton).toBeEnabled());
  });

  it("allows selecting a stock when stock prop is not provided and calculates order value", async () => {
    render(<BuyStock />);

    const selectInput = screen.getByRole("combobox", { name: /Select Stock/i });
    fireEvent.mouseDown(selectInput);

    const stockOption = await screen.findByText(DUMMY_STOCKS[0].label);
    fireEvent.click(stockOption);

    const quantityInput = screen.getByRole("spinbutton", { name: /Quantity/i });
    fireEvent.change(quantityInput, { target: { value: "3" } });

    const orderValueInput = screen.getByRole("spinbutton", {
      name: /Order Value/i,
    });
    await waitFor(() => expect(orderValueInput).not.toHaveValue(0));

    const submitButton = screen.getByRole("button", {
      name: /Confirm Buy Order/i,
    });
    expect(submitButton).toBeEnabled();
  });
});
