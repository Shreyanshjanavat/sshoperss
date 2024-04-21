import React, { useContext } from 'react'
import './CSS/Shopcategory.css'
import { Shopcontext } from '../components/Context/Shopcontext'
import drop_down from '../components/Assets/dropdown_icon.png'
import Item from '../components/Items/Item'


const Shopcategory = (props) => {
  const {all_product}=useContext(Shopcontext)
  return (
    <div className='shop-category'>
        <img  className='shopcategory-banner'src={props.banner} alt=''/>  
        <div className="shopcategory-indexshort">
          <p>
          <span> Showing 1-12</span> out of 36 product
          </p>
          <div className="shopcategory-sort">
            Sort by<img src={drop_down} alt=""/>
          </div>
          </div>
          <div className="shopcategory-products">
            {
             all_product.map((item,i)=>{
              if(props.category===item.category){
                 return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
              }
              else{
                return null;
              }
             })
            }
            </div>    
    </div>
  )
}

export default Shopcategory
