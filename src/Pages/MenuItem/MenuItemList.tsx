import React, { useEffect } from 'react'
import { useDeleteMenuItemMutation, useGetMenuItemsQuery } from '../../Apis/menuItemApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';
import { menuItemModel } from '../../Interfaces';
import { setMenuItem } from '../../Storage/Redux/menuItemSlice';
import { MainLoader } from '../../Components/Page/Common';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function MenuItemList() {
    const [deleteMenuItem] = useDeleteMenuItemMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {data, isLoading} = useGetMenuItemsQuery(null);
    //json 2 ts : => https://transform.tools/json-to-typescript

    const handleMenuItemDelete = async (id:number) => {
        const response  = deleteMenuItem(id);
        toast.promise(
          response,
          {
            pending: 'Processing your request...',
            success: 'Menu Item deleted 👌',
            error: 'Error encountered 🤯'
          },
          {
            theme:"dark",
          }
      )
      navigate("/menuItem/menuitemlist");
    }

    useEffect(()=>{
     if(!isLoading)
      {
        dispatch(setMenuItem(data.result));
      }
    },[isLoading]);
    
    const menuItems =useSelector((state:RootState) => state.menuItemStore.menuItem); 

  return (
    <>
    {isLoading && <MainLoader/>}
    {!isLoading && (
         <div className="table p-5">
         <div className="d-flex align-items-center justify-content-between">
           <h1 className="text-success">MenuItem List</h1>
           <button className="btn btn-success"
            onClick={() => navigate("/menuitem/menuitemupsert")}
           >
            Add New Menu Item
          </button>
         </div>
         <div className="p-2">
           <div className="row border">
             <div className="col-2">Image</div>
             <div className="col-1">ID</div>
             <div className="col-2">Name</div>
             <div className="col-2">Category</div>
             <div className="col-1">Price</div>
             <div className="col-2">Special Tag</div>
             <div className="col-1">Action</div>
           </div>
     
           {menuItems.length>0 && menuItems.map((menuItem: menuItemModel, index: number) => 
             (
           <div className="row border" key={menuItem.id}>
             <div className="col-2">
               <img
                 src={`${process.env.PUBLIC_URL}/redmango/${menuItem.name.toLowerCase()}.jpg`}
                 // src={help}
                 alt="no content"
                 style={{ width: "100%", maxWidth: "120px" }}
               />
             </div>
             <div className="col-1">{menuItem.id}</div>
             <div className="col-2">{menuItem.name}</div>
             <div className="col-2">{menuItem.category}</div>
             <div className="col-1">{menuItem.price}</div>
             <div className="col-2">{menuItem.specialTag}</div>
             <div className="col-1">
               <button className="btn btn-success"
                 onClick={() => navigate("/menuitem/menuitemupsert/"+menuItem.id)}>
                 <i className="bi bi-pencil-fill"
                 ></i>
               </button>
               <button className="btn btn-danger mx-2"
                onClick={() =>handleMenuItemDelete(menuItem.id)}
               >
                 <i className="bi bi-trash-fill"></i>
               </button>
             </div>
           </div>
          ))}
         </div>
       </div>
    )}
   
  </>
    )
}

export default MenuItemList