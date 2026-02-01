import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../redux/features/auth/authApi';
import { setLogin } from '../../redux/slices/authSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const result = await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            }).unwrap();

            if (result?.success && result?.token) {
                // Save token and user data to Redux + localStorage
                dispatch(setLogin({
                    user: result.user,
                    token: result.token,
                    refreshToken: result.refreshToken || null
                }));

                toast.success('Registration successful! Welcome!');
                navigate('/');
            } else if (result?.success) {
                // If no token in response, redirect to login
                toast.success('Registration successful! Please login.');
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error(error?.data?.message || 'Registration failed');
        }
    };

    const getPasswordStrength = () => {
        const password = formData.password;
        if (!password) return { strength: 0, label: '', color: '' };
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        const colors = ['', 'text-red-500', 'text-orange-500', 'text-yellow-500', 'text-success-600', 'text-success-700'];
        return { strength, label: labels[strength], color: colors[strength] };
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-96 bg-primary-900 skew-y-3 origin-top-left -translate-y-48"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white py-10 px-8 shadow-float rounded-2xl border border-neutral-100">
                    <div className="text-center mb-6">
                        <Link to="/" className="inline-block">
                            <img src="/snc-logo.png" alt="SNC-Domain" className="h-12 w-auto object-contain mx-auto" />
                        </Link>
                    </div>
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-neutral-900">Create your account</h2>
                        <p className="mt-2 text-sm text-neutral-600">Start managing your domains today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="First name"
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                error={errors.firstName}
                                placeholder="John"
                            />
                            <Input
                                label="Last name"
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                error={errors.lastName}
                                placeholder="Doe"
                            />
                        </div>

                        <Input
                            label="Email address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={errors.email}
                            placeholder="you@example.com"
                        />

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                error={errors.password}
                                placeholder="••••••••"
                            />
                            {formData.password && passwordStrength.label && (
                                <div className="mt-2 flex items-center justify-between text-xs">
                                    <span className="text-neutral-500">Strength:</span>
                                    <span className={`font-semibold ${passwordStrength.color}`}>{passwordStrength.label}</span>
                                </div>
                            )}
                        </div>

                        <Input
                            label="Confirm password"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            error={errors.confirmPassword}
                            placeholder="••••••••"
                        />

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 cursor-pointer"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-medium text-neutral-700 cursor-pointer select-none">
                                    I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                                </label>
                                {errors.agreeToTerms && <p className="text-red-600 mt-1">{errors.agreeToTerms}</p>}
                            </div>
                        </div>

                        <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg shadow-primary-500/20" isLoading={isLoading}>
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-8 border-t border-neutral-100 pt-6 text-center">
                        <p className="text-sm text-neutral-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
                {/* Trust footer */}
                <div className="mt-8 flex justify-center gap-6 text-neutral-400 grayscale opacity-70">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>Free setup</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
