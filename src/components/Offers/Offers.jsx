import React from 'react'
import './Offers.css'
import exclusive_img from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offer'>
        <div className='offer-left'>
            <h1> Exclusive</h1>
            <h1> Offers For You</h1>
            <p> Only on best seller product </p>
            <button>Check Now</button>


        </div>
        <div className='offer-right'>
            <img src={exclusive_img} alt=''/>

        </div>
      
    </div>
  )
}

export default Offers
