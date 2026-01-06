import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, CheckCircle } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        if (!email) {
            setError('Email is required');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email is invalid');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);
        // Mock password reset - in real app, this would call backend API
        setTimeout(() => {
            setIsLoading(false);
            setSuccess(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-96 bg-primary-900 skew-y-3 origin-top-left -translate-y-48"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 group">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <Globe className="w-7 h-7 text-primary-600" />
                        </div>
                        <span className="text-3xl font-bold text-white tracking-tight">SNC-Domain</span>
                    </Link>
                </div>

                <div className="bg-white py-10 px-8 shadow-float rounded-2xl border border-neutral-100">
                    {success ? (
                        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-16 h-16 mx-auto mb-6 bg-success-50 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-success-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Check your email</h2>
                            <p className="text-neutral-600 mb-8 leading-relaxed">
                                We've sent password reset instructions to <span className="font-semibold text-neutral-900">{email}</span>
                            </p>
                            <Link to="/login">
                                <Button variant="primary" size="lg" className="w-full">
                                    Return to Sign in
                                </Button>
                            </Link>
                            <p className="mt-6 text-sm text-neutral-500">
                                Didn't receive the email? <button type="button" onClick={() => setSuccess(false)} className="text-primary-600 hover:text-primary-500 font-medium">Try again</button>
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8 text-center">
                                <h2 className="text-2xl font-bold text-neutral-900">Reset password</h2>
                                <p className="mt-2 text-sm text-neutral-600">
                                    Enter your email to receive reset instructions
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    label="Email address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={error}
                                    placeholder="you@example.com"
                                />

                                <Button type="submit" variant="primary" size="lg" className="w-full shadow-lg shadow-primary-500/20" isLoading={isLoading}>
                                    Send Reset Link
                                </Button>
                            </form>

                            <div className="mt-8 border-t border-neutral-100 pt-6 text-center">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Sign in
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
