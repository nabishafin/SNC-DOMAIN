import { baseApi } from "../../api/baseApi";

export const dyndnsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // DynDNS Core APIs
        listDynDns: builder.query({
            query: (params) => ({
                url: "/dyndns/list",
                method: "GET",
                params,
            }),
            transformResponse: (response) => {
                const data = response.data?.resData || response.data || [];
                return Array.isArray(data) ? data : [];
            },
            providesTags: ["dyndns"],
        }),
        createDynDns: builder.mutation({
            query: (body) => ({
                url: "/dyndns/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["dyndns"],
        }),
        updateDynDns: builder.mutation({
            query: (body) => ({
                url: "/dyndns/update-record",
                method: "POST",
                body,
            }),
            invalidatesTags: ["dyndns"],
        }),
        deleteDynDns: builder.mutation({
            query: (body) => ({
                url: "/dyndns/delete",
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["dyndns"],
        }),
        getDynDnsInfo: builder.mutation({
            query: (body) => ({
                url: "/dyndns/info",
                method: "POST",
                body,
            }),
        }),
        checkDynDns: builder.mutation({
            query: (body) => ({
                url: "/dyndns/check",
                method: "POST",
                body,
            }),
        }),
        changeDynDnsPassword: builder.mutation({
            query: (body) => ({
                url: "/dyndns/changepassword",
                method: "POST",
                body,
            }),
        }),
        viewDynDnsLogs: builder.mutation({
            query: (body) => ({
                url: "/dyndns/log",
                method: "POST",
                body,
            }),
        }),

        // DynDNS Subscription APIs
        listDynDnsSubscriptions: builder.query({
            query: (params) => ({
                url: "/dyndns/subscription/list",
                method: "GET",
                params,
            }),
            transformResponse: (response) => {
                const data = response.data?.subscriptions || response.data || [];
                return Array.isArray(data) ? data : [];
            },
            providesTags: ["dyndns-subscription"],
        }),
        createDynDnsSubscription: builder.mutation({
            query: (body) => ({
                url: "/dyndns/subscription/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["dyndns-subscription"],
        }),
        cancelDynDnsSubscription: builder.mutation({
            query: (body) => ({
                url: "/dyndns/subscription/cancel",
                method: "POST",
                body,
            }),
            invalidatesTags: ["dyndns-subscription"],
        }),
        listDynDnsProducts: builder.query({
            query: () => "/dyndns/subscription/products",
            transformResponse: (response) => {
                const data = response.data?.products || response.data || [];
                return Array.isArray(data) ? data : [];
            },
            providesTags: ["dyndns-products"],
        }),
        purchaseDynDns: builder.mutation({
            query: (body) => ({
                url: "/dyndns/subscription/purchase",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useListDynDnsQuery,
    useCreateDynDnsMutation,
    useUpdateDynDnsMutation,
    useDeleteDynDnsMutation,
    useGetDynDnsInfoMutation,
    useCheckDynDnsMutation,
    useChangeDynDnsPasswordMutation,
    useViewDynDnsLogsMutation,
    useListDynDnsSubscriptionsQuery,
    useCreateDynDnsSubscriptionMutation,
    useCancelDynDnsSubscriptionMutation,
    useListDynDnsProductsQuery,
    usePurchaseDynDnsMutation,
} = dyndnsApi;
