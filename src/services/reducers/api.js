import { createApi} from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: axiosBaseQuery(),
    reducerPath: 'api',
    tagTypes: ['Orders'],
    endpoints: () => ({}),
});