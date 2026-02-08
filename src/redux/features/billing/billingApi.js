import baseApi from "../../api/baseApi";

export const billingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBillingOverview: builder.query({
            query: () => ({
                url: "/billing/overview",
                method: "GET",
            }),
            providesTags: ["billing"],
        }),
        getBillingHistory: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: "/billing/history",
                method: "GET",
                params: { page, limit },
            }),
            providesTags: (result, error, { page }) => [
                { type: "billing", id: "HISTORY" },
                { type: "billing", id: `HISTORY-${page}` }
            ],
        }),
        getBillingInvoices: builder.query({
            query: () => ({
                url: "/billing/invoices",
                method: "GET",
            }),
            providesTags: ["billing"],
        }),
    }),
});

export const {
    useGetBillingOverviewQuery,
    useGetBillingHistoryQuery,
    useGetBillingInvoicesQuery,
} = billingApi;
