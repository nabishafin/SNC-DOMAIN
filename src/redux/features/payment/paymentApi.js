import baseApi from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        initiatePayment: builder.mutation({
            query: (paymentData) => ({
                url: `/payments/initiate`,
                method: "POST",
                body: paymentData,
            }),
            invalidatesTags: ["payments"],
        }),
        getPaymentStatus: builder.query({
            query: (orderId) => ({
                url: `/payments/status/${orderId}`,
                method: "GET",
            }),
            providesTags: (result, error, arg) => [{ type: "payments", id: arg }],
        }),
        createSncPayment: builder.mutation({
            query: (data) => ({
                url: `/payments/snc/create`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["payments"],
        }),
        getSncNonce: builder.mutation({
            query: (data) => ({
                url: `/payments/snc/wallet/nonce`,
                method: "POST",
                body: data,
            }),
        }),
        verifySncWallet: builder.mutation({
            query: (data) => ({
                url: `/payments/snc/wallet/verify`,
                method: "POST",
                body: data,
            }),
        }),
        verifySncPayment: builder.mutation({
            query: (data) => ({
                url: `/payments/snc/verify`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["payments"],
        }),
        getSncPayment: builder.query({
            query: (paymentId) => ({
                url: `/payments/snc/${paymentId}`,
                method: "GET",
            }),
            providesTags: (result, error, arg) => [{ type: "payments", id: arg }],
        }),
        getSncConfig: builder.query({
            query: () => ({
                url: `/payments/config`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useInitiatePaymentMutation,
    useGetPaymentStatusQuery,
    useCreateSncPaymentMutation,
    useGetSncNonceMutation,
    useVerifySncWalletMutation,
    useVerifySncPaymentMutation,
    useGetSncPaymentQuery,
    useGetSncConfigQuery,
} = paymentApi;
