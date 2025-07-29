import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/public/api/signup",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.token,
               role: result?.data?.data?.role,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
                role:result?.data?.data?.role,
            })
          );
        } catch (err) {
          //do nothing
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/public/api/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.token,
              role:result?.data?.data?.role,
            })
          );
          console.log("Saved to localStorage:", {
  accessToken: result.data.token,
  user: result?.data?.data?.role,
});
          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
              user: result?.data?.data?.role,
            })
          );
        } catch (err) {}
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;