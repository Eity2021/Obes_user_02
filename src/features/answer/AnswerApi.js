import { apiSlice } from "../api/apiSlice";

export const answerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAnswer: builder.mutation({
            query: ({data,role}) => ({
                url: `/public/api/${role}/quesans`,
                method: "POST",
                body: data
            }),
        }),

          getAnswerList: builder.query({
          query: ({role,id}) => `/public/api/${role}/qansjsonview/${id}`,
    }),


    }),
});

export const { useCreateAnswerMutation ,useGetAnswerListQuery} = answerApi;
