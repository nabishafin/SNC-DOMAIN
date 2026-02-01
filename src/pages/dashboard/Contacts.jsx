import { useState } from 'react';
import { Mail, Phone, MapPin, Plus, MoreHorizontal, Trash2, Edit2 } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

const Contacts = () => {
    const { addToast } = useToast();
    const [contacts, setContacts] = useState([
        {
            id: '1',
            type: 'Owner',
            name: 'John Doe',
            email: 'john@snc-domain.com',
            phone: '+1 (555) 123-4567',
            address: '123 Tech Blvd, San Francisco, CA',
            isDefault: true,
        },
        {
            id: '2',
            type: 'Technical',
            name: 'Jane Smith',
            email: 'jane@snc-domain.com',
            phone: '+1 (555) 987-6543',
            address: '456 Dev Lane, New York, NY',
            isDefault: false,
        },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        type: 'Administrative'
    });

    const handleAddContact = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API
        setTimeout(() => {
            const newContact = {
                id: Math.random().toString(),
                ...formData,
                isDefault: false
            };
            setContacts([...contacts, newContact]);
            setIsLoading(false);
            setIsAddModalOpen(false);
            addToast('success', 'Contact Added', `${formData.name} has been added to your contacts.`);
            setFormData({ name: '', email: '', phone: '', address: '', type: 'Administrative' });
        }, 1000);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            setContacts(contacts.filter(c => c.id !== id));
            addToast('success', 'Contact Deleted', 'The contact has been removed successfully.');
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Contacts</h1>
                    <p className="text-neutral-500 mt-1">Manage WHOIS contact information for your domains.</p>
                </div>
                <Button
                    variant="primary"
                    className="shadow-lg shadow-primary-500/20"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Contact
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {contacts.map((contact) => (
                    <Card key={contact.id} className="border-none shadow-soft-md hover:shadow-soft-lg transition-all duration-300">
                        <CardBody className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500 font-bold text-lg">
                                        {contact.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-900 text-lg">{contact.name}</h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <Badge variant="neutral" className="text-xs">{contact.type}</Badge>
                                            {contact.isDefault && (
                                                <Badge variant="success" className="text-xs">Default</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-neutral-400">
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="space-y-3 pt-2 border-t border-neutral-100 mt-4">
                                <div className="flex items-center gap-3 text-sm text-neutral-600">
                                    <Mail className="w-4 h-4 text-neutral-400" />
                                    {contact.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-neutral-600">
                                    <Phone className="w-4 h-4 text-neutral-400" />
                                    {contact.phone}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-neutral-600">
                                    <MapPin className="w-4 h-4 text-neutral-400" />
                                    {contact.address}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                                {!contact.isDefault && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleDelete(contact.id)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                ))}

                {/* Add New Placeholder */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-400 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-300 min-h-[200px]"
                >
                    <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-semibold">Create New Contact profile</span>
                </button>
            </div>

            {/* Add Contact Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Contact"
                description="Create a new contact profile for your domains."
            >
                <form onSubmit={handleAddContact} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Type</label>
                            <select
                                className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>Administrative</option>
                                <option>Technical</option>
                                <option>Billing</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <Input
                            label="Phone Number"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                    </div>
                    <Input
                        label="Address"
                        placeholder="Full street address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                    />

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" isLoading={isLoading}>
                            Create Contact
                        </Button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default Contacts;
