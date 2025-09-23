import { apiSlice } from "../api/apiSlice";

export const stepsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSteps: builder.mutation({
      query: ({ data, role }) => ({
        url: `/public/api/${role}/my7stepstore`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Steps"],
    }),

    getSteps: builder.query({
      query: ({ role, id }) => `/public/api/${role}/my7step/${id}`,
      providesTags: ["Steps"],
    }),
  }),
});

export const { useGetStepsQuery, useCreateStepsMutation } = stepsApi;
