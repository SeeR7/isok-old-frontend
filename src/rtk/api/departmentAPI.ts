import { apiSlice } from "./apiSlice";

export const departmentAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDepartments: builder.query({
            query: () => {
                return {
                    url: '/department',
                    method: 'GET',
                }
            },
            providesTags: result => ['Department']
        }),
        createDepartment: builder.mutation({
            query: (payload) => {
                return {
                    url: '/department',
                    method: 'POST',
                    body: payload,
                }
            },
            invalidatesTags: ['Department']
        }),
        deleteDepartment: builder.mutation({
            query: (payload) => {
                return {
                    url: '/department/' + payload.id,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Department']
        }),
        updateDepartment: builder.mutation({
            query: (payload) => {
                return {
                    url: '/department',
                    method: 'PUT',
                    body: payload
                }
            },
            invalidatesTags: ['Department']
        }),
    })
})

export const { 
    useGetDepartmentsQuery, 
    useCreateDepartmentMutation,
    useDeleteDepartmentMutation,
    useUpdateDepartmentMutation
} = departmentAPI