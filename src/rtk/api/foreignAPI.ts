import { apiSlice } from "./apiSlice";

export const foreingAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => {
                return {
                    url: '/project',
                    method: 'GET',
                }
            },
        }),
        getAgregats: builder.query({
            query: () => {
                return {
                    url: '/agregats',
                    method: 'GET',
                }
            },
        }),
        getDses: builder.query({
            query: () => {
                return {
                    url: '/dses',
                    method: 'GET',
                }
            },
        }),
        getProject: builder.query({
            query: (payload) => {
                return {
                    url: '/project/' + payload.id,
                    method: 'GET',
                }
            },
        }),
        getProjectAgregats: builder.query({
            query: (payload) => {
                return {
                    url: '/project-agregats/' + payload.id,
                    method: 'GET',
                }
            },
        }),
        getSostav: builder.query({
            query:(payload) => {
                return {
                    url: '/sostav/' + payload.id,
                    method: 'GET',
                }
            },
            providesTags: result => ['Dse', 'Tech']
        }),
        getDseCard: builder.query({
            query: (payload) => {
                return {
                    url: '/dse-card/' + payload.id,
                    method: 'GET',
                }
            },
            providesTags: result => ['Dse', 'Tech']
        }),
        updateLocalDse: builder.mutation({
            query: (payload) => {
                return {
                    url: '/dse',
                    method: 'PUT',
                    body: payload
                }
            },
            invalidatesTags: ['Dse']
        }),
        updateLocalTech: builder.mutation({
            query: (payload) => {
                return {
                    url: '/technology',
                    method: 'PUT',
                    body: payload
                }
            },
            invalidatesTags: ['Tech']
        }),
    })
})

export const { 
useGetProjectQuery,
useGetProjectsQuery,
useGetProjectAgregatsQuery,
useGetSostavQuery,
useGetDseCardQuery,
useGetAgregatsQuery,
useGetDsesQuery,
useUpdateLocalDseMutation,
useUpdateLocalTechMutation
} = foreingAPI