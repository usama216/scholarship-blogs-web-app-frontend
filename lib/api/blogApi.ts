import { baseApi } from './baseApi'

export interface CreatePostRequest {
  title: string
  slug?: string
  excerpt?: string
  content: string
  featured_image?: string
  is_featured?: boolean
  status?: 'draft' | 'published'
  category_id?: string
  country_id?: string
  tags?: string[]
  meta_description?: string
  meta_keywords?: string
  seo_title?: string
  // Scholarship-specific fields
  scholarship_provider?: string
  university_name?: string
  funding_type_id?: string
  application_deadline?: string
  program_duration?: string
  eligible_nationalities?: string
  application_fee?: boolean
  application_fee_amount?: number
  official_website?: string
  apply_link?: string
  scholarship_benefits?: string
  eligibility_criteria?: string
  required_documents?: string
  how_to_apply?: string
  notes?: string
  contact_email?: string
  application_mode?: 'online' | 'offline' | 'both'
  available_seats?: number
  host_university_logo?: string
  scholarship_brochure_pdf?: string
  video_embed?: string
  faq_data?: any
  scheduled_publish_at?: string
  degree_level_ids?: string[]
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string
}

export interface UpdateStatusRequest {
  id: string
  status: 'draft' | 'published'
}

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Degree Levels endpoints
    getDegreeLevels: builder.query({
      query: () => '/degree-levels',
      providesTags: ['Post'],
    }),
    createDegreeLevel: builder.mutation({
      query: (data: { name: string; slug?: string; description?: string }) => ({
        url: '/degree-levels',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    updateDegreeLevel: builder.mutation({
      query: ({ id, ...data }: { id: string; name?: string; slug?: string; description?: string }) => ({
        url: `/degree-levels/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    deleteDegreeLevel: builder.mutation({
      query: (id: string) => ({
        url: `/degree-levels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    // Funding Types endpoints
    getFundingTypes: builder.query({
      query: () => '/funding-types',
      providesTags: ['Post'],
    }),
    // Tags endpoints
    getTags: builder.query({
      query: () => '/tags',
      providesTags: ['Post'],
    }),
    createTag: builder.mutation({
      query: (data: { name: string; slug?: string }) => ({
        url: '/tags',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    updateTag: builder.mutation({
      query: ({ id, ...data }: { id: string; name?: string; slug?: string }) => ({
        url: `/tags/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    deleteTag: builder.mutation({
      query: (id: string) => ({
        url: `/tags/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    // Countries endpoints
    getCountries: builder.query({
      query: () => '/countries',
      providesTags: ['Post', 'Country'],
    }),
    createCountry: builder.mutation({
      query: (data: { name: string; code: string; flag_emoji?: string; region?: string; description?: string }) => ({
        url: '/countries',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Country', 'Post'],
    }),
    updateCountry: builder.mutation({
      query: ({ id, ...data }: { id: string; name?: string; code?: string; flag_emoji?: string; region?: string; description?: string }) => ({
        url: `/countries/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Country', 'Post'],
    }),
    deleteCountry: builder.mutation({
      query: (id: string) => ({
        url: `/countries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Country', 'Post'],
    }),
    getPostsByCountrySlug: builder.query({
      query: (slug: string) => `/countries/${slug}/posts`,
      providesTags: ['Post'],
    }),
    // Categories endpoints
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Post'],
    }),
    createCategory: builder.mutation({
      query: (data: { name: string; slug?: string; description?: string }) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }: { id: string; name?: string; slug?: string; description?: string }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPostsByCategorySlug: builder.query({
      query: (slug: string) => `/categories/${slug}/posts`,
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (id: string) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation({
      query: (data: CreatePostRequest) => ({
        url: '/posts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }: UpdatePostRequest) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }, 'Post'],
    }),
    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    updatePostStatus: builder.mutation({
      query: ({ id, status }: UpdateStatusRequest) => ({
        url: `/posts/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }, 'Post'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUpdatePostStatusMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetPostsByCategorySlugQuery,
  useGetCountriesQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
  useGetPostsByCountrySlugQuery,
  useGetDegreeLevelsQuery,
  useCreateDegreeLevelMutation,
  useUpdateDegreeLevelMutation,
  useDeleteDegreeLevelMutation,
  useGetFundingTypesQuery,
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = blogApi

