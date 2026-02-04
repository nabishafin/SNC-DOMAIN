import baseApi from "../../api/baseApi";

export const dnsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDnsRecords: builder.query({
            query: (domainName) => ({
                url: `/dns/${domainName}`,
                method: "GET",
            }),
            transformResponse: (response) => response?.data || response,
            providesTags: (result, error, arg) => [{ type: "dns", id: arg }],
        }),
        addDnsRecord: builder.mutation({
            query: ({ domainName, record }) => ({
                url: `/dns/${domainName}/add`,
                method: "POST",
                body: record,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "dns", id: arg.domainName }],
        }),
        deleteDnsRecord: builder.mutation({
            query: ({ domainName, recordId }) => ({
                url: `/dns/${domainName}/delete/${recordId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [{ type: "dns", id: arg.domainName }],
        }),
    }),
});

export const {
    useGetDnsRecordsQuery,
    useAddDnsRecordMutation,
    useDeleteDnsRecordMutation,
} = dnsApi;
