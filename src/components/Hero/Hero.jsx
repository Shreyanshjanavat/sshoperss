import React from 'react'
import './Hero.css'
import hand from '../Assets/hand_icon.png'
import arow from '../Assets/arrow.png'
import mai from '../Assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-left'>
        <h2> New arrivals only</h2>
        <div>
        <div className="hero-hand-icon">
            <p> New</p>
            <img src={hand} alt=''/>
        </div>
        <p> Collections</p>
        <p> For everyone</p>
        </div>
        <div className='hero-latest-btn'>
        <div>Latest Collection</div>
        <img src={arow} alt=""/>
        </div>
      </div>
      <div className='hero-right'>
        <img src={mai} alt=''/>
      </div>
    </div>
  )
}

export default Hero
