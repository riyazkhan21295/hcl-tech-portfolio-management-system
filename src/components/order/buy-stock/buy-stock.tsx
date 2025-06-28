import {
  Form,
  InputNumber,
  Button,
  Row,
  Col,
  Typography,
  Flex,
  Select,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useBuyStock } from "./useBuyStock";

import STOCKS_JSON from "../../../data/SECURITY_DETAIL.json";

export interface IBuyStockProps {
  stock?: {
    id: string;
    name: string;
    price: number;
  };
  onComplete: (status: "success" | "failed") => void;
}

// Map data
const DUMMY_STOCKS = STOCKS_JSON.map((stock) => ({
  label: `${stock?.name} - $${stock?.amount}`,
  value: stock?.name,
  price: stock?.amount,
}));

const BuyStock = ({ stock, onComplete }: IBuyStockProps) => {
  const { form, handleSubmit } = useBuyStock({
    stock,
    onComplete,
  });

  const quantity = Form.useWatch("quantity", form);
  const selectedStockName = Form.useWatch(["stockName"], form);
  const selectedStockPrice = Form.useWatch("stockPrice", form);

  const effectiveStockName = stock?.name || selectedStockName;
  const effectivePrice = stock?.price || selectedStockPrice;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow rounded-2xl">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
        <ShoppingCartOutlined className="mr-2" />
        Buy Stock
      </h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Hidden field ensures Form.useWatch on stockPrice works correctly */}
        <Form.Item name="stockPrice" hidden>
          <InputNumber />
        </Form.Item>

        {stock?.name && stock?.price !== undefined ? (
          <Flex justify="space-between">
            <Flex vertical gap={2} className="mb-6!">
              <Typography.Text>Stock Name</Typography.Text>
              <Typography.Title className="m-0!" level={5}>
                {stock?.name}
              </Typography.Title>
            </Flex>

            <Flex vertical gap={2} className="mb-6!">
              <Typography.Text>Price/Unit</Typography.Text>
              <Typography.Title className="m-0!" level={5}>
                {stock?.price}
              </Typography.Title>
            </Flex>
          </Flex>
        ) : (
          <Row gutter={16}>
            <Col xs={24} md={24}>
              <Form.Item
                label="Select Stock"
                name="stockName"
                rules={[{ required: true, message: "Please select a stock" }]}
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Choose a stock"
                  className="w-full!"
                  options={DUMMY_STOCKS.map((s) => ({
                    label: s.label,
                    value: s.value,
                  }))}
                  filterOption={(input, option) =>
                    (option?.label as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  onChange={(value) => {
                    const stock = DUMMY_STOCKS.find((s) => s.value === value);
                    if (stock) {
                      form.setFieldsValue({ stockPrice: stock.price });
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={16}>
          {/* Quantity Input */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Quantity is required" }]}
            >
              <InputNumber
                size="large"
                min={1}
                max={1_000_000}
                className="w-full!"
                placeholder="Enter quantity"
              />
            </Form.Item>
          </Col>

          {/* Order Value */}
          <Col xs={24} md={12}>
            <Form.Item label="Order Value">
              <InputNumber
                size="large"
                className="w-full!"
                value={
                  quantity && effectivePrice
                    ? Number((effectivePrice * quantity).toFixed(2))
                    : 0
                }
                readOnly
                placeholder="Order Value will be calculated"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full!"
            disabled={!quantity || !effectiveStockName || !effectivePrice}
          >
            Confirm Buy Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BuyStock;
