import baseApi from "../../api/baseApi";

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => ({
                url: "/contacts",
                method: "GET",
            }),
            transformResponse: (response) => response?.data || response,
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
        getDomainWhois: builder.query({
            query: (domain) => ({
                url: `/domains/${domain}/contacts`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data || response,
            providesTags: (result, error, domain) => [{ type: "domains", id: `WHOIS-${domain}` }],
        }),
        assignWhoisRoles: builder.mutation({
            query: (assignmentData) => ({
                url: `/domains/contacts`,
                method: "PUT",
                body: assignmentData,
            }),
            invalidatesTags: (result, error, { domainName }) => [
                { type: "domains", id: `WHOIS-${domainName}` },
                { type: "domains", id: domainName },
            ],
        }),
    }),
});

export const {
    useGetContactsQuery,
    useCreateContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
    useGetDomainWhoisQuery,
    useLazyGetDomainWhoisQuery,
    useAssignWhoisRolesMutation,
} = contactApi;
