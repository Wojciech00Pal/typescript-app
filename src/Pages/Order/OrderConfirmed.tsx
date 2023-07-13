import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../../Storage';
import { setShoppingCart } from '../../Storage/Redux/shoppingCartSlice';
import { shoppingCartSlice } from '../../Storage/Redux/shoppingCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';

let confirmImage = require("../../Assets/Images/confirmed.jpg")

function OrderConfirmed() {
  const {id} = useParams();
  const dispatch = useDispatch();
  // const clearCartItems = () => {
  //   dispatch(setShoppingCart([]));
  // };
  dispatch(setShoppingCart([]));
  // const cartItems = useSelector((state: RootState) => state.shoppingCartStore.cartItems);
  // console.log("Cart Items:", cartItems);

  return (
    <div className="w-100 text-center d-flex justify-content-center align-items-center">
      <div>
        <i
          style={{ fontSize: "7rem" }}
          className="bi bi-check2-circle text-success"
        ></i>
        <div className="pb-5">
          <h2 className=" text-success">Order has been Confirmed!</h2>
          <h5 className="mt-3">Your order ID: {id}</h5>
          <p>We will soon start to cook the delicous food you ordered. </p>
          <img
            src={confirmImage}
            style={{ width: "40%", borderRadius: "30px" }}
          ></img>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmed