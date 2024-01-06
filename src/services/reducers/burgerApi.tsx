import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ACCESS, API_URL} from "../../utils/constants";
import {updateData} from "./feedSlice";
import {QueryArgs} from "@testing-library/react";
import {BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {BasicItemsResponse, Ingredient, IOrder} from "../../utils/types";
import {Feed} from "../../utils/types";

const accessToken = localStorage.getItem(ACCESS)

type Channel = "redux" | "general";


export const burgerApi = createApi({
    reducerPath: 'burgerApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: builder => ({
        getIngredients: builder.query({
            query: () => `/ingredients`,
            transformResponse: (response: BasicItemsResponse<Ingredient>, meta) => {
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
                body: {
                    ingredients: payload,
                    token: accessToken,
                },
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
        getFeed: builder.query<Feed, Channel>({
            query: () => ({
                url: `/orders/all`
            }),
            async onCacheEntryAdded(
                arg,
                { dispatch, updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                // create a websocket connection when the cache subscription starts
                const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all')
                try {
                    // wait for the initial query to resolve before proceeding
                    await cacheDataLoaded

                    // when data is received from the socket connection to the server,
                    // if it is a message and for the appropriate channel,
                    // update our query result with the received message
                    const listener = (event: MessageEvent) => {
                        const data = JSON.parse(event.data)
                        console.log(data);
                        updateCachedData((draft) => {
                            dispatch(updateData(data))
                            return data
                        })
                    }

                    ws.addEventListener('message', listener)
                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                ws.close()
            },
        }),
        getUserFeed: builder.query<Feed, Channel>({
            query: () => `/orders`,
            async onCacheEntryAdded(
                arg,
                { dispatch, updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            )  {
                const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken!!.replace("Bearer ","")}`);
                try {
                    await cacheDataLoaded;
                    const listener = (event: MessageEvent) => {
                        const data = JSON.parse(event.data);

                        updateCachedData((draft) => {
                            dispatch(updateData(data))
                            return data;
                        });

                    };
                    ws.addEventListener("message", listener);
                } catch(e) {
                    console.log(e);
                }
                await cacheEntryRemoved;
                ws.close();
            },
        }),
    }),
})

export const {useGetIngredientsQuery, usePostLogoutMutation, usePostRegisterMutation, usePostLoginMutation, usePostOrderMutation, usePostForgotMutation, usePostResetMutation, useGetFeedQuery, useGetUserFeedQuery} = burgerApi;