import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "../Components/Layout";
import { AccessDenied, AllOrders, AuthenticationTest, AuthenticationTestAdmin, Home, Login, MenuItemDetails, MenuItemList, MenuItemUpsert, MyOrders, NotFound, OrderConfirmed, OrderDetails, Payment, Register, ShoppingCart } from "../Pages";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartByIdQuery } from "../Apis/shoppingCartApi";
import { useEffect, useState } from "react";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import userModel from "../Interfaces/userModel";
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";


function App() {
  //empty because it will be execute every time componet renders
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData : userModel = useSelector((state: RootState) => state.userAuthStore);
  const {data, isLoading} = useGetShoppingCartByIdQuery(userData.id,{
    skip:skip, });//wait till we have id
   
  useEffect(()=>{
    const localToken = localStorage.getItem("token");
    if(localToken){
      const {fullName,id,email,role}:userModel= jwt_decode(localToken);
      dispatch(setLoggedInUser({fullName,id,email,role}));
    }
  })

  useEffect(()=>{
    if(!isLoading && data)//loading is complete
    { 
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  }, [userData]);

  useEffect(()=>{
    if(userData.id) setSkip(false);
  },[userData])

  return (
    <div>
      <Header/>
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails/>}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route
            path="/authentication"
            element={<AuthenticationTest/>}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin/>}
          />
          <Route path="/accessDenied" element={<AccessDenied/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/order/orderconfirmed/:id" element={<OrderConfirmed/>} />
          <Route path="/order/myOrders" element={<MyOrders/>} />
          <Route path="/order/AllOrders" element={<AllOrders/>} />
          <Route path="/menuItem/menuitemlist" element={<MenuItemList/>} />
          <Route path="/menuItem/menuItemUpsert/:id" element={<MenuItemUpsert/>} />
          <Route path="/menuItem/menuItemUpsert" element={<MenuItemUpsert/>} />
          <Route path="order/OrderDetails/:id" element={<OrderDetails/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
