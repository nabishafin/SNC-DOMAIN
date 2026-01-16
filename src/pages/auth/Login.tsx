import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useToast } from '../../context/ToastContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const { login } = useAuthStore();
    const { addToast } = useToast();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
            addToast('success', 'Welcome back!', 'You have successfully logged in.');
            navigate('/dashboard');
        } catch (error) {
            setErrors({ ...errors, email: 'Invalid credentials' });
            addToast('error', 'Login Failed', 'Please check your email and password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-96 bg-primary-900 skew-y-3 origin-top-left -translate-y-48"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center justify-center group">
                        <img src="/snc-logo.png" alt="SNC-Domain" className="h-12 w-auto object-contain" />
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white py-10 px-8 shadow-float rounded-2xl border border-neutral-100">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-neutral-900">Welcome back</h2>
                        <p className="mt-2 text-sm text-neutral-600">
                            Sign in to access your domain dashboard
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={errors.email}
                            placeholder="you@example.com"
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password}
                            placeholder="••••••••"
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700 cursor-pointer select-none">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg shadow-primary-500/20" isLoading={isLoading}>
                            Sign in
                        </Button>
                    </form>

                    <div className="mt-8 border-t border-neutral-100 pt-6">
                        <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 mb-6">
                            <Lock className="w-4 h-4" />
                            <span>Secure SSL Encryption</span>
                        </div>
                        <p className="text-center text-sm text-neutral-600">
                            New to SNC-Domain?{' '}
                            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Trust badges footer */}
                <div className="mt-8 flex justify-center gap-6 text-neutral-400 grayscale opacity-70">
                    {/* Simple SVGs or icons for trust */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>Verified Security</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>24/7 Support</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
