import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // createBmi: builder.mutation({
    //   query: ({data,role}) => ({
    //     url: `/public/api/${role}/bmistore`,
    //     method: "POST",
    //     body:data
    //   }),
    // }),

    getVideos: builder.query({
      query: (role) => `/public/api/${role}/youtubelinkview`,
    }),
  }),
});

export const { useGetVideosQuery, useCreateVideosMutation } = videosApi;
