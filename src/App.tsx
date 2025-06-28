import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import AuthProvider, { useAuth } from "./contexts/auth-context";

import LoginScreen from "./screens/login-screen";
import SummaryScreen from "./screens/summary-screen";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route element={<AuthRoute />}>
            <Route path="login" element={<LoginScreen />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="summary" element={<SummaryScreen />} />
            <Route path="create-order" element={null} />
            <Route path="transactions-history" element={null} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/summary" />;
  }

  return <Outlet />;
};

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
