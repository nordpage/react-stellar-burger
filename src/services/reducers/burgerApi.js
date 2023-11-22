import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ACCESS, API_URL} from "../../utils/constants";
import {io} from "socket.io-client";
import {updateFeeds} from "./feedSlice";

const accessToken = localStorage.getItem(ACCESS)

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
                headers: {
                    Authorization: accessToken
                },
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
            query: (arg) => ({
                url: `/orders/all`
            }),
            async onCacheEntryAdded(_arg, { dispatch, cacheEntryRemoved, getState, getCacheEntry }) {
                const socket = io('wss://norma.nomoreparties.space');

                socket.on('disconnect', reason => {
                    // Logic on disconnect
                    console.log('reason', reason);
                });

                socket.on('connect', function () {
                    console.log('connected!');

                    socket.on('message', function (message) {
                        console.log('message!', message);

                        dispatch(updateFeeds(message.data));
                    });
                });

                await cacheEntryRemoved;
                socket.close();
            },
        }),
        getUserFeed: builder.query({
            query: (channel) => ({
                url: `/orders?token=${accessToken.replace("Bearer ","")}`,
                headers: {Authorization: accessToken},
            }),
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            )  {
                const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken.replace("Bearer ","")}`);
                try {
                    await cacheDataLoaded;
                    const listener = (event) => {
                        const data = JSON.parse(event.data);
                        if (data.channel !== arg) return;

                        updateCachedData((draft) => {
                          // draft.push(data);
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