import baseApi from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardOverview: builder.query({
            query: () => ({
                url: `/dashboard/overview`,
                method: "GET",
            }),
            transformResponse: (response) => {
                return response?.data || response;
            },
            providesTags: ["dashboardStats"],
        }),
    }),
});

export const {
    useGetDashboardOverviewQuery,
} = dashboardApi;
