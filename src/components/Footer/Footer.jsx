import React from 'react'
import './Footer.css'
import logo from "../Assets/logo_big.png"
import insta from "../Assets/instagram_icon.png"
import whatshap from "../Assets/whatsapp_icon.png"
import pinster from "../Assets/pintester_icon.png"

const Footer = () => {
  return (
    <div className="footer">
        <div className='footer-logo'>
            <img src={logo} alt=''/>
            <p> SShoppers</p>
        </div>
        <ul className='footer-links'>
            <li> Company</li>
            <li> product</li>
            <li> Offices</li>
            <li> Aboutus</li>
            <li> Contact</li>

        </ul>
        <div className='footer-icons'>
            <div className='footer-icons-container'>
                <img src={insta} alt=""/>
            </div>
            <div className='footer-icons-container'>
                <img src={whatshap} alt=""/>
            </div>
            <div className='footer-icons-container'>
                <img src={pinster} alt=""/>
            </div>
        </div>
        <div className='footer-copyright'>
            <hr/>
            <p> 
                Copyright @ -2024-All Right-Reserved
            </p>
        </div>
      
    </div>
  )
}

export default Footer
