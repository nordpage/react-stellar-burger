import { api } from './api';
import { io } from 'socket.io-client';
import { actionSetUsers } from '../reducer';
import { actionGetUsers } from '../actions';
import { actionTypeHandle } from '../utils';

export const wsApi = api.injectEndpoints({
        endpoints: build => ({
            getFeed: build.query({
                queryFn: () => ({data: []}),
                async onCacheEntryAdded(_arg, { dispatch, cacheEntryRemoved, getState, getCacheEntry }) {
                    const socket = io('wss://norma.nomoreparties.space/orders/all');

                    socket.on('disconnect', reason => {
                        // Logic on disconnect
                        console.log('reason', reason);
                    });

                    socket.on('connect', function () {
                        console.log('connected!');

                        socket.on('message', function (message) {
                            console.log('message!', message);

                            actionTypeHandle(message, dispatch);
                            dispatch(actionSetUsers(message.data));
                            dispatch(actionGetUsers(message));
                        });
                    });

                    await cacheEntryRemoved;
                    socket.close();
                },
            }),
    }),
})

export const { useGetFeedQuery } = wsApi;