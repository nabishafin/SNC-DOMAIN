import baseApi from "../../api/baseApi";

export const nameserverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Zone Management
        getZoneInfo: builder.query({
            query: (domain) => ({
                url: `/nameserver/${domain}/info`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data || response,
            providesTags: (result, error, arg) => [{ type: "zones", id: arg }],
        }),
        listZones: builder.query({
            query: (params) => ({
                url: `/nameserver/list`,
                method: "GET",
                params,
            }),
            transformResponse: (response) => response?.data || response,
            providesTags: ["zones"],
        }),
        checkZone: builder.mutation({
            query: ({ domain, ns }) => ({
                url: `/nameserver/check`,
                method: "POST",
                body: { domain, ns },
            }),
        }),
        createZone: builder.mutation({
            query: ({ domain }) => ({
                url: `/nameserver/create`,
                method: "POST",
                body: { domain },
            }),
            invalidatesTags: ["zones"],
        }),
        cloneZone: builder.mutation({
            query: ({ domain, sourceDomain }) => ({
                url: `/nameserver/clone`,
                method: "POST",
                body: { domain, sourceDomain },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "zones", id: arg.domain },
                { type: "zone-records", id: arg.domain },
            ],
        }),
        updateZone: builder.mutation({
            query: ({ domain, ...body }) => ({
                url: `/nameserver/${domain}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "zones", id: arg.domain },
                { type: "domains", id: arg.domain },
            ],
        }),
        deleteZone: builder.mutation({
            query: (domain) => ({
                url: `/nameserver/${domain}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "zones", id: arg },
                { type: "zone-records", id: arg },
            ],
        }),

        // DNS Record Management (via nameserver API)
        getZoneRecords: builder.query({
            query: (domain) => ({
                url: `/nameserver/${domain}/info`,
                method: "GET",
            }),
            transformResponse: (response) => {
                const data = response?.data || response;
                return data?.record || [];
            },
            providesTags: (result, error, arg) => [{ type: "zone-records", id: arg }],
        }),
        createZoneRecord: builder.mutation({
            query: ({ domain, ...record }) => ({
                url: `/nameserver/${domain}/records`,
                method: "POST",
                body: record,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "zone-records", id: arg.domain },
                { type: "zones", id: arg.domain },
                { type: "dns", id: arg.domain },
            ],
        }),
        updateZoneRecord: builder.mutation({
            query: ({ domain, recordId, ...updates }) => ({
                url: `/nameserver/${domain}/records/${recordId}`,
                method: "PUT",
                body: updates,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "zone-records", id: arg.domain },
                { type: "dns", id: arg.domain },
            ],
        }),
        deleteZoneRecord: builder.mutation({
            query: ({ domain, recordId }) => ({
                url: `/nameserver/${domain}/records/${recordId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "zone-records", id: arg.domain },
                { type: "zones", id: arg.domain },
                { type: "dns", id: arg.domain },
            ],
        }),

        // Zone Export
        exportZone: builder.query({
            query: (domain) => ({
                url: `/nameserver/${domain}/export`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data || response,
        }),
    }),
});

export const {
    useGetZoneInfoQuery,
    useListZonesQuery,
    useCheckZoneMutation,
    useCreateZoneMutation,
    useCloneZoneMutation,
    useUpdateZoneMutation,
    useDeleteZoneMutation,
    useGetZoneRecordsQuery,
    useCreateZoneRecordMutation,
    useUpdateZoneRecordMutation,
    useDeleteZoneRecordMutation,
    useLazyExportZoneQuery,
} = nameserverApi;
