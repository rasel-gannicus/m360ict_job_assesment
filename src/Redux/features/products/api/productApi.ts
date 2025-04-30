import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductsResponse } from "../types/product.types";

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, { limit: number; skip: number; search?: string }>({
      query: ({ limit, skip, search }) => {
        if (search && search.trim()) {
          return `products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }
        return `products?limit=${limit}&skip=${skip}`;
      },
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>(
      {
        query: ({ id, ...patch }) => ({
          url: `products/${id}`,
          method: "PATCH",
          body: patch,
        }),
        invalidatesTags: ["Products"],
      }
    ),
    getCategories: builder.query<string[], void>({
      query: () => "products/categories",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
} = productApi;
