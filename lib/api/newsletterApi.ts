import { baseApi } from './baseApi'

export interface NewsletterSubscription {
  email: string
}

export interface NewsletterResponse {
  success: boolean
  message: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribed_at: string
  unsubscribed_at?: string
  is_active: boolean
}

export interface NewsletterSubscribersResponse {
  success: boolean
  data: NewsletterSubscriber[]
  total: number
  page: number
  limit: number
}

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Subscribe to newsletter
    subscribeToNewsletter: builder.mutation<NewsletterResponse, NewsletterSubscription>({
      query: (data) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Newsletter'],
    }),

    // Unsubscribe from newsletter
    unsubscribeFromNewsletter: builder.mutation<NewsletterResponse, string>({
      query: (email) => ({
        url: '/newsletter/unsubscribe',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['Newsletter'],
    }),

    // Get all subscribers (admin)
    getSubscribers: builder.query<NewsletterSubscribersResponse, { active_only?: boolean; page?: number; limit?: number }>({
      query: (params = {}) => ({
        url: '/newsletter/subscribers',
        method: 'GET',
        params,
      }),
      providesTags: ['Newsletter'],
    }),
  }),
})

export const {
  useSubscribeToNewsletterMutation,
  useUnsubscribeFromNewsletterMutation,
  useGetSubscribersQuery,
} = newsletterApi

