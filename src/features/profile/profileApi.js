import { apiSlice } from "../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProfile:builder.query({
            query:() => '/public/api/profile'
  
        })
    })
});

export const {useGetProfileQuery} = profileApi;
