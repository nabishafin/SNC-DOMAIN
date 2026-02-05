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
    }),
});

export const {
    useInitiatePaymentMutation,
    useGetPaymentStatusQuery,
} = paymentApi;
