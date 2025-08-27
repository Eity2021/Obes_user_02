import { apiSlice } from "../api/apiSlice";


export const logoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLogout: builder.mutation({
      query: () => ({
        url: `/api/logout`,
        method: "POST",
        // body:data
      }),
    }),

  }),
});

export const {useCreateLogoutMutation } = logoutApi;
