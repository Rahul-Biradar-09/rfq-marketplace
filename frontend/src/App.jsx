import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import CreateRfq from "./pages/buyer/CreateRfq";
import MyRfqs from "./pages/buyer/MyRfqs";
import EditRfq from "./pages/buyer/EditRfq";
import RfqQuotations from "./pages/buyer/RfqQuotations";

import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import BrowseRfqs from "./pages/supplier/BrowseRfqs";
import RfqDetails from "./pages/supplier/RfqDetails";
import MyQuotations from "./pages/supplier/MyQuotations";

import { useAuth } from "./context/AuthContext";

const HomeRedirect = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate
      to={user?.role === "BUYER" ? "/buyer" : "/supplier"}
      replace
    />
  );
};

const App = () => {
  return (
    <>
      <Navbar />

      <main className="app-main">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Buyer routes */}
          <Route element={<ProtectedRoute allowedRoles={["BUYER"]} />}>
            <Route path="/buyer" element={<BuyerDashboard />} />
            <Route path="/buyer/rfqs" element={<MyRfqs />} />
            <Route path="/buyer/rfqs/create" element={<CreateRfq />} />
            <Route path="/buyer/rfqs/:id/edit" element={<EditRfq />} />
            <Route
              path="/buyer/rfqs/:id/quotations"
              element={<RfqQuotations />}
            />
          </Route>

          {/* Supplier routes */}
          <Route element={<ProtectedRoute allowedRoles={["SUPPLIER"]} />}>
            <Route path="/supplier" element={<SupplierDashboard />} />
            <Route path="/supplier/rfqs" element={<BrowseRfqs />} />
            <Route path="/supplier/rfqs/:id" element={<RfqDetails />} />
            <Route
              path="/supplier/quotations"
              element={<MyQuotations />}
            />
          </Route>

          {/* Unknown route */}
          <Route path="*" element={<HomeRedirect />} />
        </Routes>
      </main>
    </>
  );
};

export default App;