import { apiSlice } from "../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProfile:builder.query({
            query:() => '/public/api/user/profile'
  
        })
    })
});

export const {useGetProfileQuery} = profileApi;
