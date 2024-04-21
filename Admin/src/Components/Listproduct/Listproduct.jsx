import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import remove_icon from '../../assets/cross_icon.png'
const Listproduct = () => {
  const [allproducts,setallproducts]=useState([]);
  const fetchinfo=async()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>(res.json()))
    .then((data)=>{setallproducts(data)})
  }
  useEffect(()=>{
    fetchinfo()
  },[])
  const removeproduct=async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:"POST",
      headers:{
       Accept:'application/json',
       'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchinfo();
  }
  return (
    <div className="list-product">
      <p> All Product List</p>
      <div className="list-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="lsitproduct-allproduct">
        <hr/>
        {allproducts.map((product,index)=>{
            return <div key={index} className='list-format-main listproduct-format'>
              <img src={product.image} alt=" " className='listproduct-image'/>
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img src={remove_icon}  onClick={()=>{removeproduct(product.id)}} className='remove-icon'/>
            </div>
          

      
        })}
      </div>
    </div>
  )
}

export default Listproduct
