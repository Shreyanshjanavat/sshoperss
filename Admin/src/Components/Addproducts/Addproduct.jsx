import React, { useState } from 'react'
import uploadarea from '../../assets/upload_area.svg'
import './Addproduct.css'

const Addproduct = () => {
  const [image,setiamge]=useState(false);
  const imagehandler=(e)=>{
    setiamge(e.target.files[0])
  }
  const [productdetails,setProductdetails]=useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:"",
  })
  const changehandler=(e)=>{
    setProductdetails({...productdetails,[e.target.name]:e.target.value})
  }
  const ADD_product =async()=>{
      console.log(productdetails)
      let responsedata;
      let product=productdetails;
      let formdata=new FormData();
      formdata.append('product',image);
      await fetch('http://localhost:4000/upload',{
        method:'POST',
        headers:
        {
          Accept:'application/json',
        },
        body:formdata,
      }).then((resp)=>resp.json()).then((data)=>(responsedata=data))

      if(responsedata.success){
        product.image=responsedata.image_url;
        console.log(product);
      
        await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:
        {
          Accept:'application/json',
         'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product add"):alert("Failed")
      })
    }
    else
    {
        alert(responsedata.errors);
    }
      
  }
  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productdetails.name} onChange={changehandler} type="text"  name='name' placeholder='Type here'/>
      </div>
      <div className="addproduct-price">
      <div className="addproduct-itemfield">
        <p>Price</p>
        <input value={productdetails.old_price} onChange={changehandler} type='text' name='old_price' placeholder='Type here'/>
      </div>
      <div className="addproduct-itemfield">
        <p>Offer Price</p>
        <input  value={productdetails.new_price} onChange={changehandler} type='text' name='new_price' placeholder='Type here'/>
      </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productdetails.category} onChange={changehandler} name='category' className='addproduct-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
          <img src={image?URL.createObjectURL(image):uploadarea} alt="" className='addproduct-thumnail-img'  />
        </label>
        <input onChange={imagehandler} name='image' id='file-input' type='file' hidden />
      </div>
      <button onClick={()=>{ADD_product()}} className="addproduct-button">ADD</button>
    </div>
  )
}

export default Addproduct
