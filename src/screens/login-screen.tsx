import { Button } from "antd";
import { useAuth } from "../contexts/auth-context";

const LoginScreen = () => {
  const { login } = useAuth();

  return (
    <Button size="large" onClick={login}>
      Login
    </Button>
  );
};

export default LoginScreen;
