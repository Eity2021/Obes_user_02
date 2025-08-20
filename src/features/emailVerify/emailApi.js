import { apiSlice } from "../api/apiSlice";



export const emailApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
         createEmailVerify: builder.mutation({
      query: (id) => ({
        url: `/public/api/email/verify/${id}`,
        method: "POST",
        body: { id }
      }),
    }),
    })
});

export const {useCreateEmailVerifyMutation} = emailApi;
