import { apiSlice } from "../api/apiSlice";



export const questionApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getQuestion:builder.query({
            query:(role) => `/public/api/${role}/quesview`
  
        })
    })
});

export const {useGetQuestionQuery} = questionApi;
