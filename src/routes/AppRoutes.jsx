import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import Home from '../pages/home/Home';
import DomainSearch from '../pages/domain/DomainSearch';
import Pricing from '../pages/pricing/Pricing';
import About from '../pages/company/About';
import Accessibility from '../pages/company/Accessibility';
import AiEthics from '../pages/company/AiEthics';
import BusinessEthics from '../pages/company/BusinessEthics';
import CareerPolicy from '../pages/company/CareerPolicy';
import CommunityRules from '../pages/company/CommunityRules';
import ComplianceFramework from '../pages/company/ComplianceFramework';
import CookiePolicy from '../pages/company/CookiePolicy';
import DigitalServicesAct from '../pages/company/DigitalServicesAct';
import ExtendedPolicy from '../pages/company/ExtendedPolicy';
import GeneralRiskWarning from '../pages/company/GeneralRiskWarning';
import HumanRightsPolicy from '../pages/company/HumanRightsPolicy';
import Imprint from '../pages/company/Imprint';
import ModernSlaveryAct from '../pages/company/ModernSlaveryAct';
import ProhibitedUsePolicy from '../pages/company/ProhibitedUsePolicy';
import PrivacyPolicy from '../pages/company/PrivacyPolicy';
import SupplyChainPolicy from '../pages/company/SupplyChainPolicy';
import SustainabilityPolicy from '../pages/company/SustainabilityPolicy';
import TermsOfUse from '../pages/company/TermsOfUse';
import VulnerableCustomersPolicy from '../pages/company/VulnerableCustomersPolicy';
import ProductFeedback from '../pages/company/ProductFeedback';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Checkout from '../pages/checkout/Checkout';
import PaymentSuccess from '../pages/checkout/PaymentSuccess';

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
            <Route path="/about-us" element={<About />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/ai-ethics" element={<AiEthics />} />
            <Route path="/business-ethics" element={<BusinessEthics />} />
            <Route path="/career-policy" element={<CareerPolicy />} />
            <Route path="/community-rules" element={<CommunityRules />} />
            <Route path="/compliance-framework" element={<ComplianceFramework />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/digital-services-act" element={<DigitalServicesAct />} />
            <Route path="/extended-policy" element={<ExtendedPolicy />} />
            <Route path="/general-risk-warning" element={<GeneralRiskWarning />} />
            <Route path="/human-rights-policy" element={<HumanRightsPolicy />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/modern-slavery-act" element={<ModernSlaveryAct />} />
            <Route path="/prohibited-use-policy" element={<ProhibitedUsePolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/product-feedback" element={<ProductFeedback />} />
            <Route path="/supply-chain-policy" element={<SupplyChainPolicy />} />
            <Route path="/sustainability-policy" element={<SustainabilityPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/vulnerable-customers" element={<VulnerableCustomersPolicy />} />

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
            <Route path="/checkout/success/:orderId" element={<PaymentSuccess />} />

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
