import React, { useEffect, useState } from 'react'
import { inputHelper, toastNotify } from '../../Helper';
import { useCreateMenuItemMutation, useGetMenuItemByIdQuery, useUpdateMenuItemMutation } from '../../Apis/menuItemApi';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLoader } from '../../Components/Page/Common';
import { SD_Categories } from '../../Utility/SD';
import { apiResponse } from '../../Interfaces';

const Categories = [
  SD_Categories.APPETIZER,
  SD_Categories.BEVERAGES,
  SD_Categories.DESSERT,
  SD_Categories.ENTREE
];

const menuItemData = {
    name:"",
    description:"",
    specialTag:"",
    category:Categories[0],
    price:"",
};

function MenuItemUpsert() {
  const nav = useNavigate();
  const {id} = useParams();
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");  
  const [loading, setLoading] = useState(false);
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [createMenuItem] = useCreateMenuItemMutation();
  const {data} = useGetMenuItemByIdQuery(id);
  const [updateMenuItem] = useUpdateMenuItemMutation();

  useEffect(()=>{
    if(data && data.result){
      const tempData = {
        id:id,
        name:data.result.name,
        description:data.result.description,
        specialTag:data.result.specialTag,
        category:data.result.category,
        price:data.result.price,
    };
    setMenuItemInputs(tempData);
    setImageToDisplay(`${process.env.PUBLIC_URL}/redmango/${tempData.name.toLowerCase()}.jpg`);
  }
  },[data])
  
  const handleMenuItemInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement |
    HTMLTextAreaElement>) =>
  {
    const tempData = inputHelper(e, menuItemInputs);//match value name to menuItemInputs properties
    setMenuItemInputs(tempData);
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if(file){
        const imgType = file.type.split("/")[1];
        const validTypes=["jpeg","jpg","png"]
        const isImageValid = validTypes.filter((e)=> {
            return e === imgType;
        });

        if(file.size > 1000 * 1024){
            setImageToStore("");
            toastNotify("file must be less then 1 MB", "error");
            return;
        }
        else if(isImageValid.length===0){
            setImageToStore("");
            toastNotify("File must be: jpeg, jpg or png", "error");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        setImageToStore(file);
        reader.onload = (e) => {
            const imgUrl = e.target?.result as string;
            setImageToDisplay(imgUrl);
        }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault()
    setLoading(true);
    
    if(!imageToStore && !id)
    {
        toastNotify("please upload an image","error");
        setLoading(false);
        return;
    }
    const formData = new FormData();
    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description);
    formData.append("SpecialTag", menuItemInputs.specialTag ?? "");
    formData.append("Category", menuItemInputs.category);
    const priceWithComma = String(menuItemInputs.price).replace(".", ",");
    formData.append("Price", priceWithComma);

    if(imageToDisplay) formData.append("File", imageToStore);
    let response:apiResponse;
    if(id)
    {
      //update
      formData.append("Id",id);
      response = await updateMenuItem({data: formData, id})
      if(response && response.data?.statusCode===204)
      {
        toastNotify("Updated","success");
          setLoading(false);
          nav("/menuitem/menuitemlist")
      }
      else{
        toastNotify("Failed","error");
        setLoading(false);
      }
    }
    else{
      //create
      const response = await createMenuItem(formData);
      
      if("error" in response)
      {
          toastNotify("Failed","error");
          setLoading(false);
          nav("/menuitem/menuitemlist")
      }
    //file save local not in blob service in azzure due to coasts
     toastNotify("Added","success");
      setLoading(false);
      nav("/menuitem/menuitemlist")
     }
  }

    
  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader/>}
    <h3 className=" px-2 text-success">{id ? "Edit Menu Item":"Add Menu Item"}</h3>
    <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="row mt-3">
        <div className="col-md-7 ">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            required
            name="name"
            value={menuItemInputs.name}
            onChange={handleMenuItemInput}

          />
          <textarea
            className="form-control mt-3"
            placeholder="Enter Description"
            name="description"
            rows={10}
            value={menuItemInputs.description}
            onChange={handleMenuItemInput}
          ></textarea>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Enter Special Tag"
            name="specialTag"
            value={menuItemInputs.specialTag}
            onChange={handleMenuItemInput}
          />
          <select
            className="form-control mt-3 form-select"
            placeholder="Enter Category"
            name="category"
            value={menuItemInputs.category}
            onChange={handleMenuItemInput}
          >
            {Categories.map((category)=>(
              <option value={category}>{category}</option>
            ))}
          </select>
          <input
            type="number"
            className="form-control mt-3"
            required
            placeholder="Enter Price"
            name="price"
            value={menuItemInputs.price}
            onChange={handleMenuItemInput}
          />
          <input type="file" onChange={handleFileChange} className="form-control mt-3" />
          <div className="row">
            <div className="col-6">  
            <button
              type="submit"
              className="btn btn-success form-control mt-3"
            >
             { id ? "Update": "Create"}
            </button>
            </div>
            <div className="col-6">
              <a onClick={()=> nav(-1)} className='btn btn-secondary form-control mt-3'>
                Back to Menu Items
              </a>
            </div>
          </div>
          <div className="text-center">
          
          </div>
        </div>
        <div className="col-md-5 text-center">
          <img
            src={imageToStore === "" ? "https://via.placeholder.com/150" : imageToDisplay}
            style={{ width: "100%", borderRadius: "30px" }}
            alt=""
          />
        </div>
      </div>
    </form>
  </div>
  )

}
export default MenuItemUpsert