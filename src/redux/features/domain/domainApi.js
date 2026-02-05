import baseApi from "../../api/baseApi";

export const domainApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchDomain: builder.query({
            query: (domain) => ({
                url: `/domains/search`,
                method: "GET",
                params: { domain },
            }),
            transformResponse: (response) => {
                // The API might return the data wrapped in a "data" property
                return response?.data || response;
            },
            providesTags: ["domains"],
        }),
        getMyDomains: builder.query({
            query: () => ({
                url: `/domains/my`,
                method: "GET",
            }),
            transformResponse: (response) => {
                return response?.data || response;
            },
            providesTags: ["domains"],
        }),
        getDomainDetails: builder.query({
            query: (domainName) => ({
                url: `/domains/${domainName}/details`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data || response,
            providesTags: (result, error, arg) => [{ type: "domains", id: arg }],
        }),
        toggleAutoRenew: builder.mutation({
            query: ({ domainName, autoRenew }) => ({
                url: `/domains/toggle-auto-renew`,
                method: "POST",
                body: { domainName, autoRenew },
            }),
            async onQueryStarted({ domainName, autoRenew }, { dispatch, queryFulfilled }) {
                // Optimistic update for "Get My Domains"
                const patchResult = dispatch(
                    domainApi.util.updateQueryData("getMyDomains", undefined, (draft) => {
                        const domains = draft?.myDomains || draft;
                        const domain = Array.isArray(domains) ? domains.find(d => d.domainName === domainName) : null;
                        if (domain) {
                            domain.autoRenew = autoRenew;
                        }
                    })
                );

                // Optimistic update for "Get Domain Details"
                const patchDetails = dispatch(
                    domainApi.util.updateQueryData("getDomainDetails", domainName, (draft) => {
                        if (draft?.db) {
                            draft.db.autoRenew = autoRenew;
                        } else if (draft) {
                            draft.autoRenew = autoRenew;
                        }
                    })
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                    patchDetails.undo();
                }
            },
            invalidatesTags: (result, error, arg) => [
                { type: "domains", id: arg.domainName },
                "dashboardStats"
            ],
        }),
        updateNameservers: builder.mutation({
            query: ({ domainName, nameservers }) => ({
                url: `/domains/update-nameservers`,
                method: "POST",
                body: { domainName, nameservers },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "domains", id: arg.domainName }],
        }),
        registerDomain: builder.mutation({
            query: (registrationData) => ({
                url: `/domains/register`,
                method: "POST",
                body: registrationData,
            }),
            invalidatesTags: ["domains", "dashboardStats"],
        }),
    }),
});

export const {
    useSearchDomainQuery,
    useLazySearchDomainQuery,
    useGetMyDomainsQuery,
    useGetDomainDetailsQuery,
    useToggleAutoRenewMutation,
    useUpdateNameserversMutation,
    useRegisterDomainMutation,
} = domainApi;
