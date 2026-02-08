import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Plus, MoreHorizontal, Trash2, Edit2, Loader2, Globe } from 'lucide-react';
import { useGetContactsQuery, useCreateContactMutation, useUpdateContactMutation, useDeleteContactMutation, useGetWhoisDomainsQuery, useGetSavedContactsOptionsQuery, useGetDomainWhoisQuery, useAssignWhoisRolesMutation, useRefreshWhoisMutation } from '../../redux/features/contact/contactApi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { cn } from '../../lib/utils';

const Contacts = () => {
    const { addToast } = useToast();
    const { data: contacts = [], isLoading: isFetchingContacts } = useGetContactsQuery();
    const [createContact, { isLoading: isCreating }] = useCreateContactMutation();
    const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();
    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

    // Domain WHOIS state
    const { data: whoisDomains = [] } = useGetWhoisDomainsQuery();
    const { data: savedContactsOptions = [] } = useGetSavedContactsOptionsQuery();
    const [selectedDomain, setSelectedDomain] = useState('');
    const { data: domainWhois, isFetching: isFetchingWhois } = useGetDomainWhoisQuery(selectedDomain, { skip: !selectedDomain });
    const [assignRoles, { isLoading: isAssigning }] = useAssignWhoisRolesMutation();
    const [refreshWhois] = useRefreshWhoisMutation();

    const [activeTab, setActiveTab] = useState('contacts'); // 'contacts' or 'assignments'
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        voice: '',
        street: '',
        city: '',
        pc: '',
        cc: 'US',
        type: 'PERSON',
        org: ''
    });

    useEffect(() => {
        if (editingContact) {
            setFormData({
                name: editingContact.name,
                email: editingContact.email,
                voice: editingContact.voice || editingContact.phone || '',
                street: editingContact.street || '',
                city: editingContact.city || '',
                pc: editingContact.pc || '',
                cc: editingContact.cc || 'US',
                type: editingContact.type || 'PERSON',
                org: editingContact.org || ''
            });
        } else {
            setFormData({ name: '', email: '', voice: '', street: '', city: '', pc: '', cc: 'US', type: 'PERSON', org: '' });
        }
    }, [editingContact]);

    const handleAddContact = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };
            if (payload.type !== 'ORG' || !payload.org) {
                delete payload.org;
            }
            await createContact(payload).unwrap();
            setIsAddModalOpen(false);
            addToast('success', 'Contact Added', `${formData.name} has been added to your contacts.`);
            setFormData({ name: '', email: '', voice: '', street: '', city: '', pc: '', cc: 'US', type: 'PERSON', org: '' });
        } catch (err) {
            addToast('error', 'Update Failed', err?.data?.message || 'Could not create contact');
        }
    };

    const handleEditContact = (contact) => {
        setEditingContact(contact);
        setIsEditModalOpen(true);
    };

    const handleUpdateContact = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };
            if (payload.type !== 'ORG' || !payload.org) {
                delete payload.org;
            }
            // Use normalized id or fallback to _id
            const contactId = editingContact.id || editingContact._id;
            await updateContact({ id: contactId, ...payload }).unwrap();
            setIsEditModalOpen(false);
            setEditingContact(null);
            addToast('success', 'Contact Updated', 'Contact information has been saved.');
        } catch (err) {
            addToast('error', 'Update Failed', err?.data?.message || 'Could not update contact');
        }
    };

    const handleDelete = async (idOr_id) => {
        if (confirm('Are you sure you want to delete this contact? It can only be deleted if it is not currently assigned to any domain.')) {
            try {
                await deleteContact(idOr_id).unwrap();
                addToast('success', 'Contact Deleted', 'The contact has been removed successfully.');
            } catch (err) {
                addToast('error', 'Delete Failed', err?.data?.message || 'Could not delete contact. It might be in use.');
            }
        }
    };

    const handleAssignRoles = async (roleKey, handleId) => {
        try {
            // Reconstruct all roles for the PUT request
            const roles = {
                registrant: domainWhois?.registrant?.id || domainWhois?.registrant || '',
                admin: domainWhois?.admin?.id || domainWhois?.admin || '',
                tech: domainWhois?.tech?.id || domainWhois?.tech || '',
                billing: domainWhois?.billing?.id || domainWhois?.billing || '',
                [roleKey]: handleId
            };

            await assignRoles({
                domain: selectedDomain,
                ...roles
            }).unwrap();

            addToast('success', 'Roles Assigned', `WHOIS roles for ${selectedDomain} have been updated.`);
        } catch (err) {
            addToast('error', 'Assignment Failed', err?.data?.message || 'Could not assign roles');
        }
    };

    const handleRefreshWhois = async () => {
        if (!selectedDomain) return;
        try {
            await refreshWhois(selectedDomain).unwrap();
            addToast('success', 'WHOIS Refreshed', `Data for ${selectedDomain} is now in sync with the registry.`);
        } catch (err) {
            addToast('error', 'Refresh Failed', err?.data?.message || 'Could not sync WHOIS data');
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Contacts & WHOIS</h1>
                    <p className="text-neutral-500 mt-1">Manage reusable contact profiles and domain assignments.</p>
                </div>
                {activeTab === 'contacts' && (
                    <Button
                        variant="primary"
                        className="shadow-lg shadow-primary-500/20"
                        onClick={() => {
                            setEditingContact(null);
                            setIsAddModalOpen(true);
                        }}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Contact
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-200 mb-8 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('contacts')}
                    className={cn(
                        "px-6 py-3 font-bold text-sm transition-all relative whitespace-nowrap",
                        activeTab === 'contacts' ? "text-primary-600" : "text-neutral-500 hover:text-neutral-700"
                    )}
                >
                    Saved Contacts
                    {activeTab === 'contacts' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('assignments')}
                    className={cn(
                        "px-6 py-3 font-bold text-sm transition-all relative whitespace-nowrap",
                        activeTab === 'assignments' ? "text-primary-600" : "text-neutral-500 hover:text-neutral-700"
                    )}
                >
                    Domain Assignments
                    {activeTab === 'assignments' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />}
                </button>
            </div>

            {activeTab === 'contacts' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {isFetchingContacts ? (
                        <div className="lg:col-span-2 flex justify-center py-20">
                            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
                        </div>
                    ) : contacts.map((contact) => (
                        <Card key={contact.id} className="border-none shadow-soft-md hover:shadow-soft-lg transition-all duration-300">
                            <CardBody className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500 font-bold text-lg">
                                            {contact.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg text-neutral-900 truncate group-hover:text-primary-600 transition-colors">
                                                {contact.name}
                                            </p>
                                            {contact.org && (
                                                <p className="text-xs font-semibold text-primary-600 mt-1 uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded-md inline-block">
                                                    {contact.org}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <Badge variant="neutral" className="text-xs">{contact.type || 'Administrative'}</Badge>
                                                {contact.isDefault && (
                                                    <Badge variant="success" className="text-xs">Default</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-neutral-400" onClick={() => handleEditContact(contact)}>
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
                                        {contact.voice || contact.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                                        <MapPin className="w-4 h-4 text-neutral-400" />
                                        <span className="truncate">
                                            {contact.street}, {contact.city}, {contact.pc}, {contact.cc}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditContact(contact)}>
                                        <Edit2 className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        disabled={isDeleting}
                                        onClick={() => handleDelete(contact.id || contact._id)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}

                    {/* Add New Placeholder */}
                    {!isFetchingContacts && (
                        <button
                            onClick={() => {
                                setEditingContact(null);
                                setIsAddModalOpen(true);
                            }}
                            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-neutral-200 text-neutral-400 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-300 min-h-[220px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6" />
                            </div>
                            <span className="font-semibold text-sm">Create New Contact Profile</span>
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    <Card className="border-none shadow-soft-md">
                        <CardBody className="p-6">
                            <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-primary-500" />
                                Select Domain to Manage WHOIS
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <select
                                    className="flex-1 h-12 px-4 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-medium"
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                >
                                    <option value="">Select a domain...</option>
                                    {whoisDomains.map(d => (
                                        <option key={d.domain} value={d.domain}>{d.domain}</option>
                                    ))}
                                </select>
                                <Button
                                    variant="primary"
                                    disabled={!selectedDomain || isFetchingWhois}
                                    className="sm:w-auto"
                                    onClick={handleRefreshWhois}
                                >
                                    {isFetchingWhois ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    {isFetchingWhois ? 'Fetching...' : 'Manual Sync from Registry'}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    {selectedDomain && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-top-2">
                            {['Registrant', 'Admin', 'Tech', 'Billing'].map((role) => {
                                const roleKey = role.toLowerCase();
                                const currentContact = domainWhois?.[roleKey];
                                const currentContactId = currentContact?.inwxId || currentContact?.id || currentContact;

                                return (
                                    <Card key={role} className="border-none shadow-soft border-t-4 border-t-primary-500">
                                        <CardBody className="p-5">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-bold text-neutral-900">{role}</h4>
                                                <Badge variant="ghost" className="text-[10px] uppercase">Required</Badge>
                                            </div>

                                            <select
                                                className="w-full h-10 px-3 text-sm rounded-lg border border-neutral-200 bg-neutral-50 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                                value={currentContactId || ''}
                                                onChange={(e) => handleAssignRoles(roleKey, e.target.value)}
                                                disabled={isAssigning}
                                            >
                                                <option value="">Select Contact...</option>
                                                {savedContactsOptions.map(c => (
                                                    <option key={c.id} value={c.id}>{c.label}</option>
                                                ))}
                                            </select>

                                            {currentContact && (
                                                <div className="mt-3 text-xs text-neutral-500 space-y-1">
                                                    <p className="font-bold text-neutral-700 truncate">{currentContact.label || currentContact.name || 'Unknown Contact'}</p>
                                                    {/* Only show email/other fields if they are available and NOT redundant with the label */}
                                                    {!currentContact.label && currentContact.email && !String(currentContact.email).includes('undefined') && (
                                                        <p className="truncate">{currentContact.email}</p>
                                                    )}
                                                </div>
                                            )}
                                        </CardBody>
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                    {!selectedDomain && (
                        <div className="py-20 text-center bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <Globe className="w-8 h-8 text-neutral-300" />
                            </div>
                            <h4 className="font-bold text-neutral-400">Select a domain to view its WHOIS registration</h4>
                            <p className="text-xs text-neutral-400 mt-1">Assignments allow you to reuse contact profiles for domain roles.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Add Contact Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Contact"
                description="Create a new contact profile for your domains."
                size="xl"
            >
                <form onSubmit={handleAddContact} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Type</label>
                            <select
                                className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-base font-medium"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="PERSON">Person</option>
                                <option value="ORG">Organization</option>
                            </select>
                        </div>

                        {formData.type === 'ORG' && (
                            <div className="md:col-span-2">
                                <Input
                                    label="Company Name"
                                    placeholder="e.g. Acme Corp"
                                    value={formData.org}
                                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                                    required
                                />
                            </div>
                        )}

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
                            placeholder="e.g. +1.5556667777"
                            value={formData.voice}
                            onChange={(e) => setFormData({ ...formData, voice: e.target.value })}
                            required
                            helperText="Strict format: +[Country Code].[Number] (e.g., +1.7634412300)"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <Input
                                label="Street Address"
                                placeholder="123 Main St"
                                value={formData.street}
                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                required
                            />
                        </div>
                        <Input
                            label="City"
                            placeholder="New York"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Postal Code"
                            placeholder="10001"
                            value={formData.pc}
                            onChange={(e) => setFormData({ ...formData, pc: e.target.value })}
                            required
                        />
                        <Input
                            label="Country Code"
                            placeholder="e.g. US"
                            value={formData.cc}
                            onChange={(e) => setFormData({ ...formData, cc: e.target.value })}
                            required
                            maxLength={2}
                            helperText="2-letter ISO country code"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" isLoading={isCreating}>
                            Create Contact
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Edit Contact Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Contact"
                description="Update existing contact profile information."
                size="xl"
            >
                <form onSubmit={handleUpdateContact} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Type</label>
                            <select
                                className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-base font-medium"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="PERSON">Person</option>
                                <option value="ORG">Organization</option>
                            </select>
                        </div>

                        {formData.type === 'ORG' && (
                            <div className="md:col-span-2">
                                <Input
                                    label="Company Name"
                                    placeholder="e.g. Acme Corp"
                                    value={formData.org}
                                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                                    required
                                />
                            </div>
                        )}

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
                            placeholder="e.g. +1.5556667777"
                            value={formData.voice}
                            onChange={(e) => setFormData({ ...formData, voice: e.target.value })}
                            required
                            helperText="Strict format: +[Country Code].[Number] (e.g., +1.7634412300)"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <Input
                                label="Street Address"
                                placeholder="123 Main St"
                                value={formData.street}
                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                required
                            />
                        </div>
                        <Input
                            label="City"
                            placeholder="New York"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Postal Code"
                            placeholder="10001"
                            value={formData.pc}
                            onChange={(e) => setFormData({ ...formData, pc: e.target.value })}
                            required
                        />
                        <Input
                            label="Country Code"
                            placeholder="e.g. US"
                            value={formData.cc}
                            onChange={(e) => setFormData({ ...formData, cc: e.target.value })}
                            required
                            maxLength={2}
                            helperText="2-letter ISO country code"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" isLoading={isUpdating}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default Contacts;
