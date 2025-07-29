import { apiSlice } from "../api/apiSlice";



export const stepsApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
  createSteps: builder.mutation({
      query: ({data,role}) => ({
        url: `/public/api/${role}/my7stepstore`,
        method: "POST",
        body:data
      }),
    }),
        
        getSteps:builder.query({
            query:({role,id}) => `/public/api/${role}/my7step/${id}`
  
        })
    })
});

export const {useGetStepsQuery ,useCreateStepsMutation} = stepsApi;
