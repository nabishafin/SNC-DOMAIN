import baseApi from "../../api/baseApi";

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => ({
                url: "/contacts",
                method: "GET",
            }),
            transformResponse: (response) => {
                const data = response?.data || response || [];
                return data.map(contact => ({
                    ...contact,
                    id: contact.id || contact._id // Normalize ID
                }));
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "contacts", id })),
                        { type: "contacts", id: "LIST" },
                    ]
                    : [{ type: "contacts", id: "LIST" }],
        }),
        createContact: builder.mutation({
            query: (contactData) => ({
                url: "/contacts",
                method: "POST",
                body: contactData,
            }),
            invalidatesTags: [{ type: "contacts", id: "LIST" }],
        }),
        updateContact: builder.mutation({
            query: ({ id, ...contactData }) => ({
                url: `/contacts/${id}`,
                method: "PATCH",
                body: contactData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "contacts", id },
                { type: "contacts", id: "LIST" },
            ],
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "contacts", id },
                { type: "contacts", id: "LIST" },
            ],
        }),
        getWhoisDomains: builder.query({
            query: () => ({
                url: "/domains/with-whois",
                method: "GET",
            }),
            transformResponse: (response) => response?.domains || [],
            providesTags: [{ type: "domains", id: "WHOIS-LIST" }],
        }),
        getSavedContactsOptions: builder.query({
            query: () => ({
                url: "/contacts/saved",
                method: "GET",
            }),
            transformResponse: (response) => {
                const contacts = response?.contacts || [];
                return contacts.map(c => {
                    const id = c.id || c._id;
                    let label = c.label || `${c.name || ''} – ${c.email || ''}`;
                    if (label.includes('undefined')) {
                        label = label.replace(/undefined/g, '').replace(/ – /g, '').trim() || 'Unnamed Contact';
                    }
                    return {
                        ...c,
                        id,
                        label
                    };
                });
            },
            providesTags: [{ type: "contacts", id: "OPTIONS" }],
        }),
        getDomainWhois: builder.query({
            query: (domain) => ({
                url: `/domains/${domain}/whois`,
                method: "GET",
            }),
            transformResponse: (response) => {
                const assignments = response?.assignments || response?.data || response || {};
                const normalized = {};

                // Normalize each role
                ['registrant', 'admin', 'tech', 'billing'].forEach(role => {
                    const contact = assignments[role];
                    if (contact) {
                        const id = contact.id || contact._id || contact.inwxId;
                        let label = contact.label || `${contact.name || ''} – ${contact.email || ''}`;
                        let name = contact.name || '';
                        let email = contact.email || '';

                        // Strip "undefined" from everything
                        const clean = (str) => String(str || '').replace(/undefined/g, '').replace(/ – /g, '').trim();

                        if (String(label).includes('undefined')) label = clean(label);
                        if (String(name).includes('undefined')) name = clean(name);
                        if (String(email).includes('undefined')) email = clean(email);

                        normalized[role] = {
                            ...contact,
                            id,
                            label: label || 'Unnamed Contact',
                            name: name || 'Unnamed',
                            email: email || ''
                        };
                    }
                });

                return normalized;
            },
            providesTags: (result, error, domain) => [{ type: "domains", id: `WHOIS-${domain}` }],
        }),
        assignWhoisRoles: builder.mutation({
            query: ({ domain, ...roles }) => ({
                url: `/domains/${domain}/whois`,
                method: "PUT",
                body: { ...roles, domainName: domain },
            }),
            invalidatesTags: (result, error, { domain }) => [
                { type: "domains", id: `WHOIS-${domain}` },
                { type: "domains", id: domain },
            ],
        }),
        refreshWhois: builder.mutation({
            query: (domain) => ({
                url: `/domains/${domain}/whois/refresh`,
                method: "POST",
            }),
            invalidatesTags: (result, error, domain) => [{ type: "domains", id: `WHOIS-${domain}` }],
        }),
    }),
});

export const {
    useGetContactsQuery,
    useCreateContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
    useGetWhoisDomainsQuery,
    useGetSavedContactsOptionsQuery,
    useGetDomainWhoisQuery,
    useAssignWhoisRolesMutation,
    useRefreshWhoisMutation,
} = contactApi;
