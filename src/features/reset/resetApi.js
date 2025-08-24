import { apiSlice } from "../api/apiSlice";



export const resetApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
    createReset: builder.mutation({
      query: ({data,role}) => ({
        url: `/public/api/${role}/reset-password`,
        method: "POST",
        body:data
      }),
    }),
      
    })
});

export const {useCreateResetMutation} = resetApi;
