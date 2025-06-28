import { Form, InputNumber, Button, Row, Col, Typography, Flex } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useBuyStock } from "./useBuyStock";

export interface IBuyStockProps {
  stockName: string;
  price: number;
  onComplete: (status: "success" | "failed") => void;
}

const BuyStock = ({ stockName, price, onComplete }: IBuyStockProps) => {
  const { form, handleSubmit } = useBuyStock({ price, onComplete });
  const quantity = Form.useWatch("quantity", form);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow rounded-2xl">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
        <ShoppingCartOutlined className="mr-2" />
        Buy Stock
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Flex justify="space-between">
          <Flex vertical gap={2} className="mb-6!">
            <Typography.Text>Stock Name</Typography.Text>
            <Typography.Title className="m-0!" level={5}>
              {stockName}
            </Typography.Title>
          </Flex>

          <Flex vertical gap={2} className="mb-6!">
            <Typography.Text>Price/Unit</Typography.Text>
            <Typography.Title className="m-0!" level={5}>
              {price}
            </Typography.Title>
          </Flex>
        </Flex>

        <Row gutter={16}>
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

          <Col xs={24} md={12}>
            <Form.Item label="Order Value">
              <InputNumber
                size="large"
                className="w-full!"
                value={quantity ? Number((price * quantity).toFixed(2)) : 0}
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
            disabled={!quantity}
          >
            Confirm Buy Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BuyStock;
