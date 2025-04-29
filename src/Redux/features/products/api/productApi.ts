import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductsResponse } from '../types/product.types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { limit?: number; skip?: number }>({
        query: ({ limit = 10, skip = 0 }) => `products?limit=${limit}&skip=${skip}`,
        providesTags: ['Products']
      }),
      getProduct: builder.query<Product, number>({
        query: (id) => `products/${id}`,
        providesTags: ['Products']
      }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;