import React from 'react';
import './css/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Homepage from './screens/Homepage';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutPage from './screens/AboutPage';
import ContactPage from './screens/ContactPage';
import ProductPage from './screens/ProductPage';
import CartPage from './screens/CartPage';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import EmailVerify from './screens/EmailVerify';
import ShippingPage from './screens/ShippingPage';
import ForgotPasswordPage from './screens/ForgotPasswordPage';
import PasswordReset from './screens/PasswordReset';
import PaymentPage from './screens/PaymentPage';
import ConfirmOrderPage from './screens/ConfirmOrderPage';
import OrderPage from './screens/OrderPage';
import MyAccountPage from './screens/MyAccountPage';
import MyOrdersPage from './screens/MyOrdersPage';
import ProductsPage from './screens/ProductsPage';
import AdminPage from './screens/AdminPage';
import AdminOrderListPage from './screens/AdminOrderListPage';
import AdminProductListPage from './screens/AdminProductListPage';
import AdminUserListPage from './screens/AdminUsersListPage';
import UserPage from './screens/UserPage';
import ScrollToTop from './components/ScrollToTop';
import AdminOrderPage from './screens/AdminOrderPage';
import SearchPage from './screens/SearchPage';
import AdminProductPage from './screens/AdminProductPage';
import NotFoundPage from './screens/NotFoundPage';

const App = () => {
   return (
      <Provider store={store}>
         <Router>
            <ScrollToTop />
            <Header />
            <div className="container">
               <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/cart/:id/:qty" element={<CartPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/login/:redirect" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/search/:keyword" element={<SearchPage />} />
                  <Route
                     path="/register/:redirect"
                     element={<RegisterPage />}
                  />
                  <Route
                     path="/users/:id/verify/:token"
                     element={<EmailVerify />}
                  />
                  <Route
                     path="/forgot-password"
                     element={<ForgotPasswordPage />}
                  />
                  <Route
                     path="/password-reset/:id/:token"
                     element={<PasswordReset />}
                  />
                  <Route path="/shipping" element={<ShippingPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/confirm-order" element={<ConfirmOrderPage />} />
                  <Route path="/order/:id" element={<OrderPage />} />
                  <Route path="/my-account" element={<MyAccountPage />} />
                  <Route path="/my-orders" element={<MyOrdersPage />} />

                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/all-orders" element={<AdminOrderListPage />} />
                  <Route
                     path="/admin/product/:id"
                     element={<AdminProductPage />}
                  />
                  <Route path="/admin/order/:id" element={<AdminOrderPage />} />
                  <Route
                     path="/all-products"
                     element={<AdminProductListPage />}
                  />
                  <Route
                     path="/admin/search/products/:keyword"
                     element={<AdminProductListPage />}
                  />
                  <Route path="/all-users" element={<AdminUserListPage />} />
                  <Route
                     path="/admin/search/users/:keyword"
                     element={<AdminUserListPage />}
                  />
                  <Route path="/user/:id" element={<UserPage />} />
                  <Route path="*" element={<NotFoundPage />} />
               </Routes>
            </div>
            <Footer />
         </Router>
      </Provider>
   );
};

export default App;
