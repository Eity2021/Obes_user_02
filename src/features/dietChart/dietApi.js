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
      query: ({role,mycalory}) => `/public/api/${role}/dietchartmy/${mycalory}`,
    }),
  }),
});

export const { useGetDietQuery, useCreateBmiMutation } = dietApi;
