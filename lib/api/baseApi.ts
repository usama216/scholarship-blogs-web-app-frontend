import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Base API configuration using RTK Query
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Newsletter', 'Post', 'Category', 'Country', 'DegreeLevel', 'Tag', 'FundingType', 'Job'],
  endpoints: () => ({}),
})

