import { baseApi } from "../../api/baseApi";

export const hostingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        listWebHostingPrices: builder.query({
            query: () => ({
                url: "/hosting/prices/web",
                method: "GET",
            }),
            transformResponse: (response) => {
                const data = response.data || [];
                return Array.isArray(data) ? data : [];
            },
            providesTags: ["hosting-prices"],
        }),
        listEmailHostingPrices: builder.query({
            query: () => ({
                url: "/hosting/prices/email",
                method: "GET",
            }),
            transformResponse: (response) => {
                const data = response.data || [];
                return Array.isArray(data) ? data : [];
            },
            providesTags: ["hosting-prices"],
        }),
        createHosting: builder.mutation({
            query: (body) => ({
                url: "/hosting/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["hosting-prices"],
        }),
    }),
});

export const {
    useListWebHostingPricesQuery,
    useListEmailHostingPricesQuery,
    useCreateHostingMutation,
} = hostingApi;
