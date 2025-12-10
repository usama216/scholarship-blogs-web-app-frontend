import { baseApi } from './baseApi'

export interface NewsletterSubscription {
  email: string
}

export interface NewsletterResponse {
  success: boolean
  message: string
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
  }),
})

export const {
  useSubscribeToNewsletterMutation,
  useUnsubscribeFromNewsletterMutation,
} = newsletterApi

