import { Form, message } from "antd";
import type { IBuyStockProps } from "./buy-stock";

export interface BuyFormValues {
  stockName: string;
  quantity: number;
  stockPrice?: number;
}

// type IParams = Pick<IBuyStockProps, "price" | "onComplete">;

export const useBuyStock = ({ stock, onComplete }: IBuyStockProps) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: BuyFormValues) => {
    const effectivePrice =
      stock?.price !== undefined ? stock?.price : values.stockPrice;
    const finalOrderValue =
      effectivePrice && values.quantity ? effectivePrice * values.quantity : 0;

    console.log("Buy Order Submitted ::", {
      ...values,
      transactionType: "Buy",
      orderValue: finalOrderValue,
    });

    message.success(
      `Buy order placed: ${values.quantity} units of ${
        values.stockName
      } for $${finalOrderValue.toFixed(2)}`
    );
    form.resetFields();
    onComplete?.("success");
  };

  return {
    form,
    handleSubmit,
  };
};
