import { apiSlice } from "../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProfile:builder.query({
            query:(role) => `/public/api/${role}/profile`,
            // providesTags: ['Profile']
        }),


        //  updateProfile: builder.mutation({
        //     query: ({ role, data }) => ({
        //         url: `/public/api/${role}/profile`,
        //         method: 'PUT',
        //         body: data
        //     }),
        //     invalidatesTags: ['Profile']
        // })


    })
});

export const {useGetProfileQuery} = profileApi;
