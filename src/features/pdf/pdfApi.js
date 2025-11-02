import { apiSlice } from "../api/apiSlice";


export const pdfApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPdf: builder.query({
      query: ( role ) => `/public/api/${role}/drpdfmaterialview`,
    }),
  }),
});

export const { useGetPdfQuery } = pdfApi;
