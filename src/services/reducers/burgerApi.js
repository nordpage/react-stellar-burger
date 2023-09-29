import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../../utils/constants";
import {getCookie} from "../cookies/cookies";


export const burgerApi = createApi({
    reducerPath: 'burgerApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: builder => ({
        getIngredients: builder.query({
            query: () => `/ingredients`,
            transformResponse: (response) => {
                return response.data
            },
        }),
        getUserData: builder.query({
           query: () =>  ({
               url: '/auth/user',
               headers: {
                   Authorization: getCookie("accessToken")
               }
           }),
            transformResponse: (response, meta) => {
               console.log(meta);
               return response
            }
        }),
        postLogout: builder.mutation({
            query: (form) => ({
                url: `/auth/logout`,
                method: "POST",
                body: form
            }),
        }),
        postLogin : builder.mutation({
            query:(form) => ({
                url: `/auth/login`,
                method: "POST",
                body: form
            }),
        }),
        postOrder: builder.mutation({
            query: (payload) => ({
                url: `/orders`,
                method: "POST",
                body: { ingredients: payload },
            }),
        })
    }),
})


export const {useGetIngredientsQuery, useGetUserDataQuery, usePostLogoutMutation, usePostLoginMutation, usePostOrderMutation} = burgerApi;