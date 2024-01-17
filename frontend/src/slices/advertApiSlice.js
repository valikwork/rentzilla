import { apiSlice } from './apiSlice';
const ADVERT_URL = '/api/adverts';

export const advertApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postAdvert: builder.mutation({
      query: (data) => ( {
        url: `${ADVERT_URL}`,
        method: 'POST',
        body: data,
        formData: true,
      }),
    }),
    getAllAdverts: builder.mutation({
      query: () => ({
        url: `${ADVERT_URL}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  usePostAdvertMutation,
  useGetAllAdvertsMutation,
} = advertApiSlice;