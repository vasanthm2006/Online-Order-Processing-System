import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import OrderList from "./pages/OrderList";
import OrderDetails from "./pages/OrderDetails";
import CreateOrder from "./pages/CreateOrder";
import EditOrder from "./pages/EditOrder";
import InventoryDashboard from "./pages/InventoryDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import ReturnForm from "./pages/ReturnForm";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import { AppProvider } from "./context/AppContext";
import "./App.css";

function App() {
  // App uses centralized AppProvider for state (orders/products/suppliers)
  // Local state was removed — components use context now.



  return (
    <AppProvider>
      <>
        <Navbar />

        <Hero />

        <div className="container">
          <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/edit/:id" element={<EditOrder />} />
            <Route path="/create" element={<CreateOrder />} />

            <Route path="/inventory" element={<InventoryDashboard />} />
            <Route path="/suppliers" element={<SupplierDashboard />} />
            <Route path="/returns" element={<ReturnForm />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Routes>
        </div>

        <Footer />
      </>
    </AppProvider>
  );
}

export default App;
