import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

const GlobalScroll = () => {
    const location = useLocation();

    useEffect(() => {
        // Disable global Lenis scrolling on the dashboard.
        // Dashboard uses independent scrolling areas (sidebar, main content)
        // which conflicts with global smooth scrolling attached to the body.
        if (location.pathname.startsWith('/dashboard')) {
            // Ensure body can't scroll if we land directly on dashboard
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            return;
        }

        // Reset for normal pages
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            if (lenis) lenis.destroy();
        };
    }, [location.pathname]);

    return null;
};

export default GlobalScroll;
