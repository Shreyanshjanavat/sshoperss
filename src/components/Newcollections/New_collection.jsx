import React, { useEffect, useState } from 'react'
import Item from '../Items/Item'
import './New_collection.css'


const New_collection = () => {
  const [new_collections,setnew_collectin]=useState([]);
  useEffect(()=>{
    fetch ('http://localhost:4000/newcollection')
    .then((response)=>response.json())
    .then((data)=>setnew_collectin(data));
  },[])
  return (
    <div className='new_collection'>
            <h1> New Collections</h1>
            <hr/>
            <div className='collections'>
                {
                    new_collections.map((item,i)=>{
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    })
                }
                </div>                         
    </div>
  )
}

export default New_collection
