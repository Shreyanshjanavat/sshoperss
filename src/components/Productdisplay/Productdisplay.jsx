import React, { useContext } from 'react'
import './Productdisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { Shopcontext } from '../Context/Shopcontext'

const Productdisplay = (props) => {
    const {product}=props;
    const {addToCart}=useContext(Shopcontext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
            <img src={product.image} alt=""/>
            <img src={product.image} alt=""/>
            <img src={product.image} alt=""/>
            <img src={product.image} alt=""/>
        </div>
        <div className="productdiaplay-img">
            <img className='productdispaly-main-img' src={product.image} alt=''/>
        </div>
        </div>
        <div className="productdisplay-right">
            <h1> {product.name}</h1>
            <div className="productdisplay-star">
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_dull_icon} alt=''/>
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-old_prices">${product.old_price}</div>
                <div className="productdisplay-right-new_prices">${product.new_price}</div>
            </div>
            <div className="productdiaplay-right-discription">
               <span> This material is used with high quality  slik and other materilas</span>
            </div>
       
        <div className="productdisplay-right-size">
            <h1> Select Size</h1>
            <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>L</div>
                <div>M</div>
                <div>Q</div>
            </div>
        </div>
      <button onClick={()=>{addToCart(product.id)}}> Add to cart</button>
      
    </div>
    </div>
  )
}

export default Productdisplay
