import { Form, message } from "antd";
import type { IBuyStockProps } from "./but-stock";

export interface BuyFormValues {
  stockName: string;
  quantity: number;
}

type IParams = Omit<IBuyStockProps, "stockName">;

export const useBuyStock = ({ price, onComplete }: IParams) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: BuyFormValues) => {
    const finalOrderValue = price ? price * values.quantity : 0;
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
    onComplete("success");
  };

  return {
    form,
    handleSubmit,
  };
};
