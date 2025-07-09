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
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
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
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
            })
          );
        } catch (err) {}
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;