import { apiSlice } from "../api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (role) => `/public/api/${role}/profile`,
    }),
    createProfile: builder.mutation({
      query: ({ role, data }) => ({
        url: `/public/api/${role}/profilepicup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useCreateProfileMutation } = profileApi;
