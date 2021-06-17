import React from 'react'
import HeroSection from './../../HeroSection';
import {homeObjOne,homeObjFour,homeObjTwo,homeObjThree} from './Data'
import Pricing from './../../Pricing';

function Services() {
    return (
        <>
           
           <HeroSection {...homeObjTwo}/>  
           <HeroSection {...homeObjFour}/>  
            
            
        </>
    )
}

export default Services
