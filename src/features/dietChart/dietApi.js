import { apiSlice } from "../api/apiSlice";


export const dietApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // createDiet: builder.mutation({
    //   query: ({data,role}) => ({
    //     url: `/public/api/${role}/bmistore`,
    //     method: "POST",
    //     body:data
    //   }),
    // }),

    getDiet: builder.query({
      query: ({role,id}) => `/public/api/${role}/bmiu/${id}`,
    }),
  }),
});

export const { useGetDietQuery, useCreateBmiMutation } = dietApi;
