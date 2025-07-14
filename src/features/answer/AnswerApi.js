import { apiSlice } from "../api/apiSlice";

export const answerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAnswer: builder.mutation({
            query: (data) => ({
                url: "/public/api/quesans",
                method: "POST",
                body: data
            }),
        }),

          getAnswerList: builder.query({
          query: ({id}) => `/public/api/qansjsonview/${id}`,
    }),


    }),
});

export const { useCreateAnswerMutation ,useGetAnswerListQuery} = answerApi;
