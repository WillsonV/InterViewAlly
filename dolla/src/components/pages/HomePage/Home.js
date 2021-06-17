import React from 'react'
import HeroSection from './../../HeroSection';
import {homeObjOne,homeObjFour,homeObjTwo,homeObjThree} from './Data'
import Pricing from './../../Pricing';

function Home() {
    return (
        <>
           <HeroSection {...homeObjOne}/>
           <HeroSection {...homeObjThree}/>
           <Pricing />  
           <HeroSection {...homeObjTwo}/>  
           <HeroSection {...homeObjFour}/>  
            
            
        </>
    )
}

export default Home
