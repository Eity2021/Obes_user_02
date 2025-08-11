import { apiSlice } from "../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProfile:builder.query({
            query:(role) => `/public/api/${role}/profile`
  
        })
    })
});

export const {useGetProfileQuery} = profileApi;
