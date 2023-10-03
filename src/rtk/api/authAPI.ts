import { apiSlice } from "./apiSlice";


export const authAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: data,
                    responseHandler: (response: { text: () => any }) => response.text(),
                };
            },
        }),
        logoutUser: builder.mutation({
            query: () => {
                return {
                    url: '/auth/logout',
                    method: 'POST',
                };
            },
        }),
        refreshUser: builder.mutation({
            query: () => {
                return {
                    url: '/auth/refresh-token',
                    method: 'POST',
                };
            },
        }),
        getMe: builder.query({
            query: () => {
                return {
                    url: '/auth/get-me',
                    method: 'GET',
                };
            },
            
        }),
    })
})

export const { useLoginUserMutation, useLogoutUserMutation, useRefreshUserMutation, useGetMeQuery } = authAPI;
export const logoutUser = authAPI.endpoints.logoutUser