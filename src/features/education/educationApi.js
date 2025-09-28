import { apiSlice } from "../api/apiSlice";

export const educationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEdu: builder.query({
      query: (role) => `/public/api/${role}/obeseduv`,
    }),
    getPerEdu: builder.query({
      query: ({ role, modtype }) =>
        `/public/api/${role}/obesedushow/${modtype}`,
    }),
  }),
});

export const { useGetEduQuery, useGetPerEduQuery } = educationApi;
