import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../admin/layout/AdminLayout';

import HomePage from '../pages/Home/HomePage';
import AboutPage from '../pages/About/AboutPage';
import ChefListPage from '../pages/Chefs/ChefListPage';
import ChefDetailsPage from '../pages/Chefs/ChefDetailsPage';
import MenuPage from '../pages/Order/MenuPage';
import CheckoutPage from '../pages/Order/CheckoutPage';
import OrderConfirmationPage from '../pages/Order/OrderConfirmationPage';
import ContactPage from '../pages/Contact/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

import LoginPage from '../admin/pages/Login/LoginPage';
import DashboardPage from '../admin/pages/Dashboard/DashboardPage';
import HomeManagementPage from '../admin/pages/HomeManagement/HomeManagementPage';
import AboutManagementPage from '../admin/pages/AboutManagement/AboutManagementPage';
import ChefManagementPage from '../admin/pages/ChefManagement/ChefManagementPage';
import AddChefPage from '../admin/pages/ChefManagement/AddChefPage';
import EditChefPage from '../admin/pages/ChefManagement/EditChefPage';
import MenuManagementPage from '../admin/pages/MenuManagement/MenuManagementPage';
import EditMenuPage from '../admin/pages/MenuManagement/EditMenuPage';
import OrderManagementPage from '../admin/pages/OrderManagement/OrderManagementPage';
import OrderDetailsPage from '../admin/pages/OrderManagement/OrderDetailsPage'; // <-- Added Order Details Import
import ContactManagementPage from '../admin/pages/ContactManagement/ContactManagementPage';
import ImageManagementPage from '../admin/pages/ImageManagement/ImageManagementPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/chefs" element={<ChefListPage />} />
        <Route path="/chefs/:id" element={<ChefDetailsPage />} />
        <Route path="/order" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/confirmation/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/admin/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="home" element={<HomeManagementPage />} />
          <Route path="about" element={<AboutManagementPage />} />
          <Route path="chefs" element={<ChefManagementPage />} />
          <Route path="chefs/new" element={<AddChefPage />} />
          <Route path="chefs/:id/edit" element={<EditChefPage />} />
          <Route path="menu" element={<MenuManagementPage />} />
          <Route path="menu/:id/edit" element={<EditMenuPage />} />
          <Route path="orders" element={<OrderManagementPage />} />
          <Route path="orders/:id" element={<OrderDetailsPage />} /> {/* <-- Added Order Details Route */}
          <Route path="contact" element={<ContactManagementPage />} />
          <Route path="images" element={<ImageManagementPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}