import React from 'react'

const inputHelper = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, data:any) => {
    const tempData: any = {...data};  //spread elements
    tempData[e.target.name] = e.target.value;
    // This assumes that the name attribute of the input element matches the key of the property in the data object that needs to be updated.
    return tempData;

};

export default inputHelper