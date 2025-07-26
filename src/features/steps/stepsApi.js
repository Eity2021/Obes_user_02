import { apiSlice } from "../api/apiSlice";



export const questionApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getSteps:builder.query({
            query:(role) => `/public/api/${role}/my7step`
  
        })
    })
});

export const {useGetStepsQuery} = questionApi;
