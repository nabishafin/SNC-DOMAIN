import { baseApi } from "../../api/baseApi";

export const hostApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        checkHost: builder.mutation({
            query: (body) => ({
                url: "/host/check",
                method: "POST",
                body,
            }),
        }),
        createHost: builder.mutation({
            query: (body) => ({
                url: "/host/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["host-list"],
        }),
        listHosts: builder.query({
            query: (params) => ({
                url: "/host/list",
                method: "GET",
                params,
            }),
            transformResponse: (response) => {
                const data = response.data || [];
                return Array.isArray(data) ? data : [];
            },
            providesTags: ["host-list"],
        }),
        deleteHost: builder.mutation({
            query: (id) => ({
                url: `/host/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["host-list"],
        }),
    }),
});

export const {
    useCheckHostMutation,
    useCreateHostMutation,
    useListHostsQuery,
    useDeleteHostMutation,
} = hostApi;
