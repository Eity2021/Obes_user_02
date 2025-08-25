import { apiSlice } from "../api/apiSlice";

export const emailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEmailVerify: builder.mutation({
      query: (id) => ({
        url: `/public/api/email/verify/${id}`,
        method: "POST",
        body: { id },
      }),
    }),


       getEmailVerifyToken: builder.query({
      query: (token) => `/public/api/email/updateverify/${token}`,
    }),

    
  }),
});

export const {useCreateEmailVerifyMutation,useGetEmailVerifyTokenQuery} = emailApi;
