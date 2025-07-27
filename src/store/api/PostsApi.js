import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ skip = 0, limit = 10 } = {}) => ({
        url: `/products?skip=${skip}&limit=${limit}`,
      }),
      providesTags: ['Post'],
      transformResponse: (response) => {
        // Transform products to look like posts for better UI
        const transformedPosts = response.products.map(product => ({
          id: product.id,
          title: product.title,
          content: product.description,
          image: product.thumbnail,
          author: product.brand || 'Anonymous',
          price: product.price,
          rating: product.rating,
          category: product.category,
          createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(), // Random recent date
        }))
        
        return {
          posts: transformedPosts,
          total: response.total,
          skip: response.skip,
          limit: response.limit
        }
      },
      // Enable infinite scroll by merging results
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.skip === 0) {
          // If it's the first page, replace the cache
          return newItems
        }
        // Otherwise, append new posts to existing ones
        return {
          ...newItems,
          posts: [...(currentCache?.posts || []), ...newItems.posts]
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.skip !== previousArg?.skip
      },
    }),
    getUsers: builder.query({
      query: ({ skip = 0, limit = 10 } = {}) => ({
        url: `/users?skip=${skip}&limit=${limit}`,
      }),
      transformResponse: (response) => {
        // Transform users to look like posts
        const transformedPosts = response.users.map(user => ({
          id: `user-${user.id}`,
          title: `${user.firstName} ${user.lastName}`,
          content: `Email: ${user.email} | Phone: ${user.phone} | Company: ${user.company?.name || 'N/A'}`,
          image: user.image,
          author: user.username,
          department: user.company?.department,
          age: user.age,
          createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        }))
        
        return {
          posts: transformedPosts,
          total: response.total,
          skip: response.skip,
          limit: response.limit
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.skip === 0) {
          return newItems
        }
        return {
          ...newItems,
          posts: [...(currentCache?.posts || []), ...newItems.posts]
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.skip !== previousArg?.skip
      },
    }),
  }),
})

export const { 
  useGetPostsQuery, 
  useGetUsersQuery 
} = postsApi