import {
  HistoryOutlined,
  LogoutOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";

const { Sider, Content } = Layout;

const ProtectedLayout = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const [collapsed, setCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const menuItems = getMenuItems({ navigate });

  const logoutItem = {
    key: "logout",
    icon: <LogoutOutlined className="text-lg" />,
    label: <span className="text-base">Logout</span>,
    onClick: logout,
  };

  return (
    <Layout className="min-h-screen bg-white">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="h-screen fixed left-0"
        width={250}
      >
        <div className="flex flex-col h-full">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["summary"]}
            items={menuItems}
            className="flex-grow pt-2"
          />

          <Menu
            theme="dark"
            mode="inline"
            selectable={false}
            items={[logoutItem]}
            className="border-t border-[#ffffff1a]"
          />
        </div>
      </Sider>

      <Layout className="bg-white">
        <Content className="p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;

const getMenuItems = ({ navigate }: { navigate: (path: string) => void }) => {
  return [
    {
      key: "summary",
      icon: <PieChartOutlined className="text-lg" />,
      label: <span className="text-base">Summary</span>,
      onClick: () => navigate("/summary"),
    },
    {
      key: "create-order",
      icon: <ShoppingCartOutlined className="text-lg" />,
      label: <span className="text-base">Create Order</span>,
      onClick: () => navigate("/create-order"),
    },
    {
      key: "transactions-history",
      icon: <HistoryOutlined className="text-lg" />,
      label: <span className="text-base">Transactions History</span>,
      onClick: () => navigate("/transactions-history"),
    },
  ];
};
