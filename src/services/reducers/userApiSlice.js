import {apiSlice} from "./apiSlice";
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateUserData: builder.mutation({
            query: credentials => ({
                url: '/auth/user',
                method: 'PATCH',
                body: { ...credentials }
            })
        }),
        getUserData: builder.query({
            query: () =>  ({
                url: '/auth/user',
                method: 'GET'
            }),
            transformResponse: (response) => {
                return response
            }
        }),
    })
})

export const {
    useUpdateUserDataMutation,
    useGetUserDataQuery
} = userApiSlice