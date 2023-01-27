import {createApi, fetchBaseQuery} from'@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://new-media-server.vercel.app/' }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ id }) => ({ url: `/catagory/${id}` })
        })
        
    })


})

export const {
    useGetNewsQuery,
} = apiSlice