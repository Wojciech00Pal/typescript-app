import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Header } from "../Components/Layout";

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://localhost:7258/api/",
        prepareHeaders:(headers:Headers, api)=>{
            const token = localStorage.getItem("token");
            token && headers.append("Authorization","Bearer "+ token);
        }
        // baseUrl:"https://localhost:7258/api/"
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderDetails) => ({
                url:"order",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: orderDetails,
            })  ,
            invalidatesTags: ["Orders"]
    }),
        getAllOrders: builder.query({
            query: ({userId,searchString, status,pageNumber,pageSize}) => ({
                url:"order",
                params: {
                   //only spread(rozpowszechnione) [add] if it is popoulated
                    ...(userId && {userId}),
                    ...(searchString && {searchString}),
                    ...(status && {status}),
                    ...(pageSize && {pageSize}),
                    ...(pageNumber && {pageNumber}),
                }
            }),
            transformResponse(apiResponse:{result:any}, meta:any){
                return {
                    apiResponse,
                    totalRecords:meta.response.headers.get("X-Pagination"),
                }
            },
            providesTags:["Orders"]
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url:`order/${id}`,
            }),
            providesTags:["Orders"]
        }),
        updateOrderHeader: builder.mutation({
            query:(orderDetails) => ({
                url: "order/"+orderDetails.orderHeaderId,
                method: "PUT",
                headers: {
                    "Content-type":"application/json",
                },
                body: orderDetails
            }),
            invalidatesTags:["Orders"]
        })
    }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery, useGetOrderDetailsQuery,
useUpdateOrderHeaderMutation,  } = orderApi;
export default orderApi;