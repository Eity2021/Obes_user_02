import { apiSlice } from "../api/apiSlice";



export const forgetApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
    createForget: builder.mutation({
      query: (data) => ({
        url: `/public/api/forgot-password`,
        method: "POST",
        body:data
      }),
    }),
    createForgetOtp: builder.mutation({
      query: (data) => ({
        url: `/public/api/otpmatch-password`,
        method: "POST",
        body:data
      }),
    }),
      
    createChangePassword: builder.mutation({
      query: (data) => ({
        url: `/public/api/update-forgotpassword`,
        method: "POST",
        body:data
      }),
    }),
      
    })
});

export const {useCreateForgetMutation,useCreateForgetOtpMutation ,useCreateChangePasswordMutation} = forgetApi;
