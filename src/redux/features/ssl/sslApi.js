import { baseApi } from "../../api/baseApi";

export const sslApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSslProducts: builder.query({
            query: () => "/ssl/products",
            transformResponse: (response) => response.data || response,
            providesTags: ["ssl"],
        }),
        checkSslEligibility: builder.query({
            query: (domain) => ({
                url: `/ssl/eligibility/${domain}`,
                method: "GET",
            }),
            providesTags: (result, error, arg) => [{ type: "ssl", id: `eligibility-${arg}` }],
        }),
        orderSsl: builder.mutation({
            query: (orderData) => ({
                url: `/ssl/order`,
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: ["ssl"],
        }),
    }),
});

export const {
    useGetSslProductsQuery,
    useLazyCheckSslEligibilityQuery,
    useOrderSslMutation
} = sslApi;
