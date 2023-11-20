import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setCredentials} from "./authSlice";
import {ACCESS, API_URL, REFRESH} from "../../utils/constants";

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("Authorization", token)
        }
        return headers
    }
})

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    const refreshToken = localStorage.getItem(REFRESH);
    if (result?.error?.status === 401 || result?.error?.status === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token
        const refreshResult = await baseQuery({ url: "/auth/token", method: "POST", body: { token: refreshToken } }, api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            console.log(refreshResult?.data)
            localStorage.setItem(ACCESS, refreshResult?.data.accessToken);
            localStorage.setItem(REFRESH, refreshResult?.data.refreshToken);
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({})
})