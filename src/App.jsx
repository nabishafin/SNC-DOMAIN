import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </BrowserRouter>
      </HelmetProvider>
    </ToastProvider>
  );
}

export default App;
