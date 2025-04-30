import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductsResponse, Category } from "../types/product.types";

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { limit: number; skip: number; search?: string }>({
      query: ({ limit, skip, search }) => {
        if (search && search.trim()) {
          return `products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }
        return `products?limit=${limit}&skip=${skip}`;
      },
      providesTags: ['Product'],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>(
      {
        query: ({ id, ...patch }) => ({
          url: `products/${id}`,
          method: "PATCH",
          body: patch,
        }),
        invalidatesTags: ['Product'],
      }
    ),
    getCategories: builder.query<Category[], void>({
      query: () => "products/categories",
      transformResponse: (response: Category[]) => {
        return response.map((category: Category) => ({
          slug: category.slug,
          name: category.name,
          url: category.url
        }));
      }
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
} = productApi;
