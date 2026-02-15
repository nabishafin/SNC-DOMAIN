import baseApi from "../../api/baseApi";

export const dnssecApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDnssecInfo: builder.query({
            query: (domainName) => ({
                url: `/domains/${domainName}/dnssec`,
                method: "GET",
            }),
            // API returns: { success: true, data: { resData: { data: [{ domain, keyCount, dnssecStatus }] } } }
            transformResponse: (response) => response?.data?.resData?.data?.[0] || null,
            providesTags: (result, error, arg) => [{ type: "dnssec", id: arg }],
        }),
        enableDnssec: builder.mutation({
            query: (domainName) => ({
                url: `/domains/${domainName}/dnssec/enable`,
                method: "POST",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "dnssec", id: arg },
                { type: "dnssec-keys", id: arg }
            ],
        }),
        disableDnssec: builder.mutation({
            query: (domainName) => ({
                url: `/domains/${domainName}/dnssec/disable`,
                method: "POST",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "dnssec", id: arg },
                { type: "dnssec-keys", id: arg }
            ],
        }),
        getDnssecKeys: builder.query({
            query: (domainName) => ({
                url: `/domains/${domainName}/dnssec/keys`,
                method: "GET",
            }),
            // API returns: { success: true, data: { resData: { dnskey: [...] } } }
            transformResponse: (response) => response?.data?.resData?.dnskey || [],
            providesTags: (result, error, arg) => [{ type: "dnssec-keys", id: arg }],
        }),
        addDnssecKey: builder.mutation({
            query: ({ domainName, dnskey, calculateDigest, digestType }) => ({
                url: `/domains/${domainName}/dnssec/keys`,
                method: "POST",
                body: { dnskey, calculateDigest, digestType },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "dnssec-keys", id: arg.domainName },
                { type: "dnssec", id: arg.domainName }
            ],
        }),
        deleteDnssecKey: builder.mutation({
            query: ({ domainName, keyId }) => ({
                url: `/domains/${domainName}/dnssec/keys/${keyId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "dnssec-keys", id: arg.domainName },
                { type: "dnssec", id: arg.domainName }
            ],
        }),
        deleteAllDnssecKeys: builder.mutation({
            query: (domainName) => ({
                url: `/domains/${domainName}/dnssec/keys`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "dnssec-keys", id: arg },
                { type: "dnssec", id: arg }
            ],
        }),
    }),
});

export const {
    useGetDnssecInfoQuery,
    useEnableDnssecMutation,
    useDisableDnssecMutation,
    useGetDnssecKeysQuery,
    useAddDnssecKeyMutation,
    useDeleteDnssecKeyMutation,
    useDeleteAllDnssecKeysMutation,
} = dnssecApi;
