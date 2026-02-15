import { baseApi } from "../../api/baseApi";

export const sslApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSslProducts: builder.query({
            query: () => "/ssl/products",
            transformResponse: (response) => response.data || response,
            providesTags: ["ssl-products"],
        }),
        getSslProductDetails: builder.query({
            query: (id) => `/ssl/product/${id}`,
            transformResponse: (response) => response.data || response,
        }),
        checkSslEligibility: builder.query({
            query: (domain) => ({
                url: `/ssl/eligibility/${domain}`,
                method: "GET",
            }),
            providesTags: (result, error, arg) => [{ type: "ssl", id: `eligibility-${arg}` }],
        }),
        purchaseSsl: builder.mutation({
            query: (body) => ({
                url: `/ssl/purchase`,
                method: "POST",
                body,
            }),
            transformResponse: (response) => {
                const data = response.data || response;
                // Normalize certificateId to id for frontend consistency
                if (data && data.certificateId) {
                    return {
                        ...response,
                        data: {
                            ...data,
                            id: data.certificateId
                        }
                    };
                }
                return response;
            },
            invalidatesTags: ["ssl-list"],
        }),
        updateOrder: builder.mutation({
            query: (body) => ({
                url: `/ssl/update-order`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["ssl-list", "ssl-detail"],
        }),
        listCertificates: builder.query({
            query: (params) => ({
                url: `/ssl`,
                method: "GET",
                params,
            }),
            transformResponse: (response) => {
                const data = response.data || [];
                // Map certificateId to id for frontend consistency if present
                return (Array.isArray(data) ? data : [data]).map(cert => ({
                    ...cert,
                    id: cert.id || cert.certificateId
                }));
            },
            providesTags: ["ssl-list"],
        }),
        getCertificateDetails: builder.query({
            query: (id) => `/ssl/${id}`,
            transformResponse: (response) => {
                const data = response.data || response;
                return {
                    ...data,
                    id: data.id || data.certificateId
                };
            },
            providesTags: (result, error, id) => [{ type: "ssl-detail", id }],
        }),
        cancelSslOrder: builder.mutation({
            query: (body) => ({
                url: `/ssl/cancel`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["ssl-list", "ssl-detail"],
        }),
        reissueCertificate: builder.mutation({
            query: (body) => ({
                url: `/ssl/reissue`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["ssl-list", "ssl-detail"],
        }),
        renewCertificate: builder.mutation({
            query: (body) => ({
                url: `/ssl/renew`,
                method: "POST",
                body, // Ensure period is numeric as per spec 5.1
            }),
            invalidatesTags: ["ssl-list", "ssl-detail"],
        }),
        resendApprovalEmail: builder.mutation({
            query: (body) => ({
                url: `/ssl/resend-approval`,
                method: "POST",
                body,
            }),
        }),
        setAutorenew: builder.mutation({
            query: (body) => ({
                url: `/ssl/autorenew`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["ssl-list", "ssl-detail"],
        }),
        getSslNeededData: builder.query({
            query: (id) => `/ssl/needed-data/${id}`,
            transformResponse: (response) => response.data || response,
        }),
        viewSslLog: builder.query({
            query: (id) => `/ssl/log/${id}`,
            transformResponse: (response) => response.data || response,
        }),
    }),
});

export const {
    useGetSslProductsQuery,
    useGetSslProductDetailsQuery,
    useLazyCheckSslEligibilityQuery,
    usePurchaseSslMutation,
    useUpdateOrderMutation,
    useListCertificatesQuery,
    useGetCertificateDetailsQuery,
    useCancelSslOrderMutation,
    useReissueCertificateMutation,
    useRenewCertificateMutation,
    useResendApprovalEmailMutation,
    useSetAutorenewMutation,
    useGetSslNeededDataQuery,
    useViewSslLogQuery,
} = sslApi;
