import { apiSlice } from "../api/apiSlice";


export const pdfApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPdf: builder.query({
      query: ({ role, mycalory }) => `/public/api/${role}/dietchartmy/${mycalory}`,
    }),
  }),
});

export const { useGetPdfQuery } = pdfApi;
