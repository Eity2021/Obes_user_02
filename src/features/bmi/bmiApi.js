import { apiSlice } from "../api/apiSlice";

export const bmiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBmi: builder.mutation({
      query: ({ data, role }) => ({
        url: `/public/api/${role}/bmistore`,
        method: "POST",
        body: data,
        invalidatesTags: ["Bmi"],
      }),
    }),

    getBmi: builder.query({
      query: ({ role, id }) => `/public/api/${role}/bmiu/${id}`,
       providesTags: ["Bmi"],
    }),
  }),
});

export const { useGetBmiQuery, useCreateBmiMutation } = bmiApi;
