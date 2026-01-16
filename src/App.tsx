import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './context/ToastContext';
import CartDrawer from './pages/checkout/CartDrawer';
import GlobalScroll from './components/layout/GlobalScroll';

function App() {
  return (
    <ToastProvider>
      <HelmetProvider>
        <BrowserRouter>
          <GlobalScroll />
          <AppRoutes />
          <CartDrawer />
        </BrowserRouter>
      </HelmetProvider>
    </ToastProvider>
  );
}

export default App;
