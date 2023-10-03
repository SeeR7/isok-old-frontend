import { apiSlice } from "./apiSlice";

export const userAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => {
                return {
                    url: '/employee',
                    method: 'GET',
                }
            },
            providesTags: result => ['User']
        }),
        createUser: builder.mutation({
            query: (payload) => {
                return {
                    url: '/employee',
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (payload) => {
                return {
                    url: '/employee/' + payload.id,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: (payload) => {
                return {
                    url: '/employee',
                    method: 'PUT',
                    body: payload
                }
            },
            invalidatesTags: ['User']
        }),
    })
})

export const { 
    useGetUsersQuery, 
    useCreateUserMutation, 
    useDeleteUserMutation,
    useUpdateUserMutation
} = userAPI