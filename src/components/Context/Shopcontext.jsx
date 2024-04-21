import React, { createContext, useEffect, useState } from "react";


export const Shopcontext=createContext(null);
const getdefaultcart=()=>{
    
    let cart={};
    for(let index=0; index<300+1 ; index++){
            cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider=(props)=>{
   

    const [all_product,setallproducts]=useState([]);
    const [cart_items,setcart_items]=useState(getdefaultcart());
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setallproducts(data));
    },[])
    const addToCart = (itemId) => {
        const authToken = localStorage.getItem('auth-token');
        console.log('authToken:', authToken); // Log the retrieved token
        if (authToken) {
            console.log(authToken)
            fetch('http://localhost:4000/addcart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': authToken, // Check the header name
                },
                body: JSON.stringify({ itemId: itemId }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add item to cart');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Item added to cart:', data);
                // You can perform additional actions based on the server response here
            })
            .catch((error) => {
                console.error('Error adding item to cart:', error);
                // Handle error appropriately (e.g., display error message to user)
            });
        } else {
            console.log('No auth token found'); // Log if no token is found
        }
    };
    
    const removeFromCart=(itemId)=>{
        setcart_items((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        
    }
    const getTotalcartAmount=()=>{
        let totalamount=0;
        for(const item in cart_items){
            if(cart_items[item]>0){
                let item_info=all_product.find((product)=>product.id===Number(item))
                totalamount+=item_info.new_price *cart_items[item];
            }
           
        }
        return totalamount;
    }
    const gettotalCartItems=()=>{
        let total_items=0;
        for(const item in cart_items){
            if(cart_items[item]>0){
                total_items+=cart_items[item];
            }
        }
        return total_items;
    }
    const ContextValue={gettotalCartItems,getTotalcartAmount,all_product,cart_items,addToCart,removeFromCart}
    console.log(cart_items);
    return (
        <Shopcontext.Provider value={ContextValue}>
            {
                props.children
            }
        </Shopcontext.Provider>
    )
}
export default ShopContextProvider;