import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import Home from '../pages/home/Home';
import DomainSearch from '../pages/domain/DomainSearch';
import Pricing from '../pages/pricing/Pricing';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Checkout from '../pages/checkout/Checkout';

// Dashboard Pages
import Overview from '../pages/dashboard/Overview';
import MyDomains from '../pages/dashboard/MyDomains';
import DomainDetails from '../pages/dashboard/DomainDetails';
import Settings from '../pages/dashboard/Settings';
import SSL from '../pages/dashboard/SSL';
import Contacts from '../pages/dashboard/Contacts';
import Billing from '../pages/dashboard/Billing';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<DomainSearch />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/dashboard/domains" element={<MyDomains />} />
            <Route path="/dashboard/domains/:id" element={<DomainDetails />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/ssl" element={<SSL />} />
            <Route path="/dashboard/contacts" element={<Contacts />} />
            <Route path="/dashboard/billing" element={<Billing />} />

            {/* Checkout Routes */}
            <Route path="/checkout" element={<Checkout />} />

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
