import { emptyApiSlice } from "./emptyApiSlice";

const productSlice = emptyApiSlice
  .enhanceEndpoints({
    addTagTypes: ["Product"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllProducts: builder.query({
        query: (page) => "/products",
      }),
    }),
  });

export const { useGetAllProductsQuery } = productSlice;
