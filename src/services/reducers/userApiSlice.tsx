import {apiSlice} from "./apiSlice";
import {ACCESS} from "../../utils/constants";
import {User} from "../../utils/types";
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
                method: 'GET',
                headers: {
                    "Authorization": localStorage.getItem(ACCESS)
                }
            }),
            transformResponse: (response: User) => {
                return response
            }
        }),
    })
})

export const {
    useUpdateUserDataMutation,
    useGetUserDataQuery
} = userApiSlice