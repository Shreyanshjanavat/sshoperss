import React from 'react'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import './Breadcum.css'

const Breadcum = (props) => {
    const {product}=props;
  return (
    
    <div className='breadcums'>
        HOME<img src={arrow_icon} alt =''/>SHOP<img src={arrow_icon} alt =''/>{product.category}<img src={arrow_icon} alt =''/>{product.name}
      
      
    </div>
  )
}

export default Breadcum
