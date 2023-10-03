import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { logout, setUser } from "../features/authSlice";


const BASE_URL = 'http://localhost:5000/api';
//const BASE_URL = 'http://192.168.0.100:5000/api';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        const token = getState().authState.accessToken
        if (token) {
            headers.set("Authorization", "Bearer " + token)
        }
        
        return headers
    }
})

const rfBaseQuery = async (args: any, api: any, extraOptions: any) => {

    let result = await baseQuery(args, api, extraOptions)
    
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery(
            {
                url: '/auth/refresh-token',
                method: 'POST',
                responseHandler: (response: { text: () => any }) => response.text(),
            },
            api,
            extraOptions
        )
        if (refreshResult.data) {
            const token = refreshResult.data.toString()
            api.dispatch(setUser(token))
            localStorage.setItem("accessToken", token)
            result = await baseQuery(args, api, extraOptions)
        } else {
            await baseQuery({
                url: '/auth/logout',
                method: 'POST'
            }, api, extraOptions)
            await api.dispatch(logout())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: rfBaseQuery,
    tagTypes: ['Department', 'User', 'Dse', 'Tech'],
    endpoints: () => ({})
})