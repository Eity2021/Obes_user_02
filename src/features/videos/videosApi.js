import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: (role) => `/public/api/${role}/youtubelinkview`,
    }),
    getDoctorVideos: builder.query({
      query: (role) => `/public/api/${role}/youtubedoctorview`,
    }),
  }),
});

export const { useGetVideosQuery,useGetDoctorVideosQuery} = videosApi;
