import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://ekart-add-to-cart.herokuapp.com"}),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getAllProducts : builder.query({
            query: () => "products",
            providesTags: ["Products"]
        }),
        getProduct: builder.query({
            query: (id) => ({
                url: `products/${id}`,
                providesTags: ["Products"]
            })
        })
    })
});

export const {useGetAllProductsQuery, useGetProductQuery} = productsApi;

