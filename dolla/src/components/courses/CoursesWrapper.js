import React from 'react'
import { homeObjFour, homeObjTwo } from '../pages/HomePage/Data';
import HeroSection from './../HeroSection';
import CoursesComponent from './CoursesComponent';
import { CoursesObjOne, CoursesObjTwo } from './CoursesData';
import WorkFlow from './../Howitworks/WorkFlow';
import Discounts from './../Discounts/Discounts';

function CoursesWrapper() {
    return (
        <>
 
<div>
         <center>   <h3>Courses</h3></center>

 </div>
           
            {/* <CoursesComponent {...CoursesObjTwo} />*/}
            <CoursesComponent />

            {/*           
<HeroSection {...homeObjTwo}/>  
            <HeroSection {...homeObjFour} />
  */}
<WorkFlow/>
<Discounts/>
 
 
</>
    )
}

export default CoursesWrapper
