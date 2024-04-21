import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addproduct_icon from'../../assets/Product_Cart.svg'
import listproduct_icon from '../../assets/Product_list_icon.svg'
const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <Link to ={'/addtoproduct'} style={{textDecoration:"none"}}>
        <div className='Sidebar-item'>
            <img src={addproduct_icon} alt=""></img>
            <p>AddProduct</p>
        </div>
      </Link>
      <Link to ={'/listproduct'} style={{textDecoration:"none"}}>
        <div className='Sidebar-item'>
            <img src={listproduct_icon} alt=""></img>
            <p>AddProduct</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
