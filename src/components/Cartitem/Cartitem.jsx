import React, { useContext } from 'react';
import { Shopcontext } from '../Context/Shopcontext';
import remove_icon from '../Assets/cart_cross_icon.png';
import './Cartitem.css';

const Cartitem = () => {
    
    const { getTotalcartAmount, all_product, cart_items, removeFromCart } = useContext(Shopcontext);

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cart_items[e.id] > 0) {
                    return (
                        <div key={e.id} className="cartitem" /* Add key prop with unique ID */>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt='' className='cartimage'/>
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitem-quantity'>{cart_items[e.id]}</button>
                                <p>${e.new_price * cart_items[e.id]}</p>
                                <img onClick={() => { removeFromCart(e.id) }} className="cart-remove-icon" src={remove_icon}  alt='' />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitem-down">
                <div className="cartitem-total">
                    <h1> Cart totals</h1>
                    <div>
                        <div className="cartitem-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalcartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cartitem-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className="cartitem-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalcartAmount()}</h3>
                        </div>
                    </div>
                </div>
                <button > PROCEED TO CHECK OUT</button>
            </div>
            <div className="cartitem-promocode">
                <p> IF YOU HAVE PROMO CODE ENTER IT HERE</p>
                <div className="cartitem-promobox">
                    <input type="text" placeholder='Enter your promo code'/>
                    <button> Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Cartitem;
