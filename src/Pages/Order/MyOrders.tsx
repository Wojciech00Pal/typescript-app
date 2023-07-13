import React from 'react'
import { withAuth } from '../../HOC';
import { useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';
import { useGetAllOrdersQuery } from '../../Apis/orderApi';
import OrderList from '../../Components/Page/Order/OrderList';
import { MainLoader } from '../../Components/Page/Common';
import { orderHeaderModel } from '../../Interfaces';
import { SD_Status } from '../../Utility/SD';

function MyOrders() {
  const userId = useSelector((state: RootState)=>state.userAuthStore.id);
  
  const {data, isLoading} = useGetAllOrdersQuery({userId});

  // const orderHeader: orderHeaderModel = {
  //   orderHeaderId: 1,
  //   pickupName: "John Doe",
  //   pickupPhoneNumber: "123456789",
  //   pickupEmail: "john.doe@example.com",
  //   applicationUserId: userId,
  //   user: null,
  //   orderTotal: 100.99,
  //   orderDate: "2023-05-23",
  //   stripePaymentIntentID: "payment123",
  //   status: "pending",
  //   totalItems: 2,
  //   orderDetails: [
  //     {
  //       orderDetailId: 1,
  //       orderHeaderId: 1,
  //       menuItemId: 1,
  //       menuItem: {
          
  //           id: 1,
  //           name: "string",
  //           description: "string",
  //           specialTag: "string",
  //           category: "string",
  //           price: 22.34,
  //           image: "string"
  //       },
  //       quantity: 2,
  //       itemName: "Item 1",
  //       price: 22.34,
  //     },
  //   ],
  // };

  //const newArray = [orderHeader];
  //const orderHeader = //from url headerid

  //console.log(newArray);
  //const updatedResult = data.result !== null ? [...data.result, orderHeader] : [orderHeader];

  // Update the data object with the updatedResult array
  // const updatedData = {
  //   ...data,
  //   result: updatedResult,
  // };
  // const tempdata = [...data.result, orderHeader];
  // console.log(updatedData);



  return (
    <>
    {isLoading && <MainLoader/>}
    {!isLoading && ( 
            <>
            <div className='d-flex align-items-center justify-content-between mx-5 mt-5'>
              <h1 className="text-success">My Orders</h1>
            </div> 
              <OrderList isLoading={isLoading} 
              orderData={data?.apiResponse.result} />
            
            </>
    )}
     
    </>
  )
}

export default withAuth(MyOrders);
