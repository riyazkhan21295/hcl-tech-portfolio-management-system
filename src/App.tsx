import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import AuthProvider from './contexts/auth-context';
import 'antd/dist/reset.css';

import AuthLayout from './layouts/auth-layout';
import ProtectedLayout from './layouts/protected-layout';
import LoginScreen from './screens/login-screen';
import SummaryScreen from './screens/summary-screen';
import TransectionHistory from './screens/transection-history';
import OrderScreen from './screens/order-screen';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginScreen />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path="summary" element={<SummaryScreen />} />
            <Route path="summary" element={<SummaryScreen />} />
            <Route path="create-order" element={<OrderScreen />} />
            <Route
              path="transactions-history"
              element={<TransectionHistory />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
