import { baseApi } from './baseApi'

export interface CreateJobRequest {
  title: string
  slug?: string
  excerpt?: string
  content: string
  featured_image?: string
  is_featured?: boolean
  status?: 'draft' | 'published'
  company_name: string
  company_logo?: string
  location_type: 'national' | 'international'
  country_id?: string
  employment_type_id?: string
  salary_range?: string
  remote_work?: 'onsite' | 'remote' | 'hybrid'
  application_deadline?: string
  apply_link?: string
  contact_email?: string
  job_requirements?: string
  job_responsibilities?: string
  benefits?: string
  experience_level?: string
  meta_description?: string
  meta_keywords?: string
  seo_title?: string
  scheduled_publish_at?: string
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {
  id: string
}

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmploymentTypes: builder.query({
      query: () => '/employment-types',
      providesTags: ['Job'],
    }),
    getJobs: builder.query({
      query: (params?: { location_type?: 'national' | 'international' }) => {
        const searchParams = new URLSearchParams()
        if (params?.location_type) searchParams.set('location_type', params.location_type)
        const q = searchParams.toString()
        return q ? `/jobs?${q}` : '/jobs'
      },
      providesTags: ['Job'],
    }),
    getJob: builder.query({
      query: (id: string) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Job', id }],
    }),
    getJobBySlug: builder.query({
      query: (slug: string) => `/jobs/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Job', id: slug }],
    }),
    createJob: builder.mutation({
      query: (data: CreateJobRequest) => ({
        url: '/jobs',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Job'],
    }),
    updateJob: builder.mutation({
      query: ({ id, ...data }: UpdateJobRequest) => ({
        url: `/jobs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Job', id }, 'Job'],
    }),
    deleteJob: builder.mutation({
      query: (id: string) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Job'],
    }),
    updateJobStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: 'draft' | 'published' }) => ({
        url: `/jobs/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Job', id }, 'Job'],
    }),
  }),
})

export const {
  useGetEmploymentTypesQuery,
  useGetJobsQuery,
  useGetJobQuery,
  useGetJobBySlugQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useUpdateJobStatusMutation,
} = jobsApi
