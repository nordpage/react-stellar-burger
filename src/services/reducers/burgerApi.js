import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../../utils/constants";


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
        postRegister: builder.mutation({
            query:(form) => ({
                url: `/auth/register`,
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
        }),
        postForgot: builder.mutation({
            query:(form) => ({
                url: `/password-reset`,
                method: "POST",
                body: form
            }),
        }),
        postReset: builder.mutation({
            query:(form) => ({
                url: `/password-reset/reset`,
                method: "POST",
                body: form
            }),
        }),
        getFeed: builder.query({
            query: () => ({
                url: `/orders/all`
            }),
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                const ws = new WebSocket("wss://norma.nomoreparties.space");
                try {
                    await cacheDataLoaded;
                    const listener = (event) => {
                        const data = JSON.parse(event.data);
                        if (data.channel !== arg) return;

                        updateCachedData((draft) => {
                            draft.push(data);
                        });

                    };
                    ws.addEventListener("message", listener);
                } catch {
                    console.log("error")
                }
                await cacheEntryRemoved;
                ws.close();
            },
        }),
    }),
})


export const {useGetIngredientsQuery, usePostLogoutMutation, usePostRegisterMutation, usePostLoginMutation, usePostOrderMutation, usePostForgotMutation, usePostResetMutation, useGetFeedQuery} = burgerApi;