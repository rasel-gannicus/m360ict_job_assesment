import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ErrorPage from '../components/common/ErrorPage';

// Lazy load components for better performance
const ProductList = lazy(() => import('../components/Products/ProductList'));
const ProductDetail = lazy(() => import('../components/Products/ProductDetail'));
const ProductEdit = lazy(() => import('../components/Products/ProductEdit'));

// Define route paths as constants to avoid typos
export const ROUTE_PATHS = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/:id',
  PRODUCT_EDIT: '/product/edit/:id',
} as const;

export const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: ROUTE_PATHS.PRODUCT_DETAIL,
        element: <ProductDetail />,
      },
      {
        path: ROUTE_PATHS.PRODUCT_EDIT,
        element: <ProductEdit />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
];

// Helper function for type-safe route generation
export const generatePath = {
  productDetail: (id: number) => `/product/${id}`,
  productEdit: (id: number) => `/product/edit/${id}`,
};