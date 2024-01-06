import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
import {ACCESS, API_URL, REFRESH} from "../../utils/constants";

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(ACCESS);
        if (token) {
            headers.set("Authorization", token)
        }
        return headers
    }
})

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    const refreshToken = localStorage.getItem(REFRESH);
    if (result?.error?.status === 401 || result?.error?.status === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token
        const refreshResult = await baseQuery({ url: "/auth/token", method: "POST", body: { token: refreshToken } }, api, extraOptions)
        console.log(refreshResult)
        const tokens = refreshResult as {
            data: { accessToken: string; refreshToken: string };
        };
        if (refreshResult?.data) {
            console.log(refreshResult?.data)
            localStorage.setItem(ACCESS, tokens?.data.accessToken);
            localStorage.setItem(REFRESH, tokens?.data.refreshToken);
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