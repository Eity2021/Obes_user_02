import { apiSlice } from "../api/apiSlice";

export const uploadApi = apiSlice.injectEndpoints({
  tagTypes: ["upload"],
  endpoints: (builder) => ({
    createUpload: builder.mutation({
      query: (data) => ({
        url: `/public/api/imageupload`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateUploadMutation } = uploadApi;
