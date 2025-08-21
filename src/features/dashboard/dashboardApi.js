import { apiSlice } from "../api/apiSlice";


export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({


    getDashboard: builder.query({
      query: (role) => `/public/api/${role}/mydashboard`,
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
