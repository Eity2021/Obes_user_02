import { apiSlice } from "../api/apiSlice";

export const bmiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBmi: builder.mutation({
      query: (body) => ({
        url: "/public/api/bmistore",
        method: "POST",
        body
      }),
    }),

    getBmi: builder.query({
      query: ({id}) => `/public/api/bmiu/${id}`,
    }),
  }),
});

export const { useGetBmiQuery, useCreateBmiMutation } = bmiApi;
