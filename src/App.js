/********imports from components********/
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/cart/Cart";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoutes from "./components/ProtectedRoutes";

/********imports from react-router********/
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/********imports from pages********/
import Home from "./pages/Home";
import Product from "./pages/Product";
import OrderConfirmation from "./pages/OrderConfirmation";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <ScrollToTop />
        <Header />

        <main className="grow pt-28 md:pt-32 h-full">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/product/:name/:id" element={<Product />} />
            <Route element={<ProtectedRoutes />}>
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />
            </Route>
            <Route path="/page-not-found" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/page-not-found" />} />
          </Routes>
        </main>

        <Cart />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
