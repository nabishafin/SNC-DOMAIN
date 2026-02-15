import baseApi from "../../api/baseApi";

export const nameserverSetApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        listNsSets: builder.query({
            query: () => ({
                url: `/nameserver-sets`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data?.nsset || response?.data?.sets || response?.data || [],
            providesTags: ["ns-sets"],
        }),
        getNsSet: builder.query({
            query: (id) => ({
                url: `/nameserver-sets/${id}`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data || response,
            providesTags: (result, error, arg) => [{ type: "ns-sets", id: arg }],
        }),
        createNsSet: builder.mutation({
            query: (body) => ({
                url: `/nameserver-sets`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["ns-sets"],
        }),
        updateNsSet: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/nameserver-sets/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                "ns-sets",
                { type: "ns-sets", id: arg.id },
            ],
        }),
        deleteNsSet: builder.mutation({
            query: (id) => ({
                url: `/nameserver-sets/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ns-sets"],
        }),
    }),
});

export const {
    useListNsSetsQuery,
    useGetNsSetQuery,
    useCreateNsSetMutation,
    useUpdateNsSetMutation,
    useDeleteNsSetMutation,
} = nameserverSetApi;
