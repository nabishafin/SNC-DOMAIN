import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser as updateUserAction } from '../../redux/slices/authSlice';
import { useChangePasswordMutation } from '../../redux/features/auth/authApi';
import { User, Lock, Bell, Shield } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { cn } from '../../lib/utils';
import { toast } from 'react-toastify';

const Settings = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
    const [activeTab, setActiveTab] = useState('profile');

    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        company: user?.company || '',
    });

    useEffect(() => {
        if (user) {
            setProfileData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                company: user.company || '',
            });
        }
    }, [user]);

    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [notifications, setNotifications] = useState({
        domainExpiry: true,
        renewalReminders: true,
        newsletter: false,
    });

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User, desc: 'Manage your personal info' },
        { id: 'security', label: 'Security', icon: Lock, desc: 'Password and 2FA' },
        { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Email preferences' },
    ];

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserAction(profileData));
        addToast('success', 'Profile Updated', 'Your profile information has been saved successfully.');
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.new !== passwordData.confirm) {
            addToast('error', 'Validation Error', 'New passwords do not match.');
            return;
        }

        if (passwordData.new.length < 6) {
            addToast('error', 'Validation Error', 'Password must be at least 6 characters.');
            return;
        }

        try {
            const result = await changePassword({
                currentPassword: passwordData.current,
                newPassword: passwordData.new
            }).unwrap();

            if (result?.success) {
                addToast('success', 'Password Changed', result?.message || 'Your password has been updated successfully.');
                setPasswordData({ current: '', new: '', confirm: '' });
                toast.success('Password updated successfully!');
            } else {
                addToast('error', 'Update Failed', result?.message || 'Failed to update password.');
                toast.error(result?.message || 'Failed to update password.');
            }
        } catch (err) {
            console.error('Change password error:', err);
            const errorMessage = err?.data?.message || 'Something went wrong. Please try again.';
            addToast('error', 'Update Failed', errorMessage);
            toast.error(errorMessage);
        }
    };

    const handleNotificationsSubmit = (e) => {
        e.preventDefault();
        addToast('success', 'Preferences Saved', 'Your notification settings have been updated.');
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-neutral-900">Account Settings</h1>
                <p className="text-neutral-500 mt-1">Manage your account preferences and security.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-72 flex-shrink-0 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full text-left flex items-center gap-4 p-4 rounded-xl transition-all duration-200 border",
                                    isActive
                                        ? "bg-white border-primary-100 shadow-soft-md ring-1 ring-primary-500/10"
                                        : "bg-transparent border-transparent hover:bg-white hover:shadow-sm text-neutral-600 hover:text-neutral-900"
                                )}
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                                    isActive ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200"
                                )}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className={cn("font-semibold text-sm", isActive ? "text-primary-900" : "text-neutral-900")}>{tab.label}</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">{tab.desc}</p>
                                </div>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600" />}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <Card className="border-none shadow-soft-md">
                                <CardHeader className="border-b border-neutral-100 pb-4">
                                    <h2 className="text-lg font-bold text-neutral-900">Public Profile</h2>
                                    <p className="text-sm text-neutral-500">This information will be displayed on your profile.</p>
                                </CardHeader>
                                <CardBody>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-2xl border-4 border-white shadow-sm">
                                            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                                        </div>
                                        <div>
                                            <Button variant="outline" size="sm">Change Avatar</Button>
                                            <p className="text-xs text-neutral-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="First Name"
                                                value={profileData.firstName}
                                                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                            />
                                            <Input
                                                label="Last Name"
                                                value={profileData.lastName}
                                                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                            />
                                        </div>
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            value={profileData.email}
                                            disabled // Email usually fixed or changed via special flow
                                            placeholder="you@example.com"
                                        />
                                        <Input
                                            label="Company Name"
                                            value={profileData.company}
                                            onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                                            placeholder="e.g. Acme Inc."
                                        />

                                        <div className="flex justify-end pt-4 border-t border-neutral-100">
                                            <Button type="submit" variant="primary" className="shadow-lg shadow-primary-500/20">
                                                Save Changes
                                            </Button>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <Card className="border-none shadow-soft-md">
                                <CardHeader className="border-b border-neutral-100 pb-4">
                                    <h2 className="text-lg font-bold text-neutral-900">Password</h2>
                                    <p className="text-sm text-neutral-500">Update your password to keep your account secure.</p>
                                </CardHeader>
                                <CardBody>
                                    <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-xl">
                                        <Input
                                            label="Current Password"
                                            type="password"
                                            value={passwordData.current}
                                            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                            placeholder="••••••••"
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="New Password"
                                                type="password"
                                                value={passwordData.new}
                                                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                                placeholder="••••••••"
                                            />
                                            <Input
                                                label="Confirm New Password"
                                                type="password"
                                                value={passwordData.confirm}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                                placeholder="••••••••"
                                            />
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <Button type="submit" variant="primary" className="shadow-lg shadow-primary-500/20" isLoading={isChangingPassword}>
                                                Update Password
                                            </Button>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>

                            <Card className="border-none shadow-soft-md bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
                                <CardBody className="flex items-center justify-between p-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Shield className="w-5 h-5 text-success-400" />
                                            <h3 className="font-bold text-lg">Two-Factor Authentication</h3>
                                        </div>
                                        <p className="text-neutral-400 max-w-md text-sm leading-relaxed">
                                            Add an extra layer of security to your account. We'll send a code to your phone when you log in.
                                        </p>
                                    </div>
                                    <Button variant="primary" className="bg-white text-neutral-900 hover:bg-neutral-100 border-none">
                                        Enable 2FA
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <Card className="border-none shadow-soft-md">
                                <CardHeader className="border-b border-neutral-100 pb-4">
                                    <h2 className="text-lg font-bold text-neutral-900">Email Notifications</h2>
                                    <p className="text-sm text-neutral-500">Choose what updates you want to receive.</p>
                                </CardHeader>
                                <CardBody>
                                    <form onSubmit={handleNotificationsSubmit} className="space-y-0 divide-y divide-neutral-100">
                                        <label className="flex items-center justify-between py-4 cursor-pointer hover:bg-neutral-50 -mx-6 px-6 transition-colors">
                                            <div>
                                                <p className="font-semibold text-neutral-900">Domain Expiry</p>
                                                <p className="text-sm text-neutral-500 mt-0.5">
                                                    Get notified when your domains are expiring
                                                </p>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications.domainExpiry}
                                                    onChange={(e) =>
                                                        setNotifications({ ...notifications, domainExpiry: e.target.checked })
                                                    }
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                            </div>
                                        </label>

                                        <label className="flex items-center justify-between py-4 cursor-pointer hover:bg-neutral-50 -mx-6 px-6 transition-colors">
                                            <div>
                                                <p className="font-semibold text-neutral-900">Renewal Reminders</p>
                                                <p className="text-sm text-neutral-500 mt-0.5">
                                                    Receive reminders before auto-renewals
                                                </p>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications.renewalReminders}
                                                    onChange={(e) =>
                                                        setNotifications({ ...notifications, renewalReminders: e.target.checked })
                                                    }
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                            </div>
                                        </label>

                                        <label className="flex items-center justify-between py-4 cursor-pointer hover:bg-neutral-50 -mx-6 px-6 transition-colors">
                                            <div>
                                                <p className="font-semibold text-neutral-900">Weekly Newsletter</p>
                                                <p className="text-sm text-neutral-500 mt-0.5">
                                                    News, updates, and featured domains
                                                </p>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications.newsletter}
                                                    onChange={(e) =>
                                                        setNotifications({ ...notifications, newsletter: e.target.checked })
                                                    }
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                            </div>
                                        </label>

                                        <div className="flex justify-end pt-6">
                                            <Button type="submit" variant="primary" className="shadow-lg shadow-primary-500/20">
                                                Save Preferences
                                            </Button>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
