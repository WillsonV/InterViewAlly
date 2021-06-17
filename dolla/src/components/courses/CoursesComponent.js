import React from 'react'
import { homeObjTwo } from '../pages/HomePage/Data';
import { homeObjFour } from '../pages/Services/Data';
import HeroSection from './../HeroSection';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';
import { Button } from './../Button';
import { BsXDiamondFill } from 'react-icons/bs';
import { GiCrystalize } from 'react-icons/gi';
import './CoursesComponent.css'
import {useSelector,useDispatch} from 'react-redux';
import { Grid, Paper } from '@material-ui/core';


function CoursesComponent({CourseType,price,Features,Features2,Features3,Features4}) {

  const dispatch = useDispatch();
  const productlist = useSelector(state => state.items);
  console.log(productlist);

  const AddToBasketHandler=(id)=>{
    dispatch({type:'Add',id:id});
  } 

  const RemoveFromBasketHandler=()=>{
    dispatch({type:'Remove'});
  }

    return (
<>
  
      {/* Object.keys(productlist).map((keyName, i) => (
    <li className="travelcompany-input" key={i}>
        <span className="input-label">key: {i} Name: {productlist[keyName]}</span>
    </li>
      )) */}
        
        {
          productlist.map((keyName, i) => (
            
    <li className="travelcompany-input" key={i}>
        <span className="input-label">key: {i} Name: {productlist[keyName]}</span>
            </li>
            

            
          )
          )}
        <IconContext.Provider value={{ color: '#fff', size: 64 }}>
        <div className='Courses__section'>
            <div className='Courses__wrapper'>
          <div className='Courses__container'>
          {
          productlist.map((keyName, i) => (

            <Link  className='Courses__container-card'>
              <div className='Courses__container-cardInfo'>
                <div className='icon'>
                  <FaFire />
                </div>
                <h3>{keyName.title}</h3>
                <h4>{keyName.price}  $ </h4>
                <p>per hour</p>
                <ul className='Courses__container-features'>
               <li>{keyName.Features}</li>
               <li>{keyName.Features2}</li>
               <li>{keyName.Features3}</li>
               <li>{keyName.Features4}</li>
                 
                </ul>
                <Button onClick={()=>AddToBasketHandler(keyName.id)} buttonSize='btn--wide' buttonColor='primary'>
                  Add to cart
                </Button>
                {(keyName.quantity > '0' || keyName.quantity != undefined)  && <Button onClick={() => AddToBasketHandler(keyName.id)} buttonSize='btn--wide' buttonColor='primary'>
                  Go to cart {keyName.quantity}
                 
                </Button>
                }
              </div>
                      </Link>

          )
              )}
            
            </div>
          </div>
          </div>
          </IconContext.Provider>
                    
        





   {/*   
<IconContext.Provider value={{ color: '#fff', size: 64 }}>
      <div className='Courses__section'>
        <div className='Courses__wrapper'>
          <div className='Courses__container'>
            <Link  className='Courses__container-card'>
              <div className='Courses__container-cardInfo'>
                <div className='icon'>
                  <FaFire />
                </div>
                <h3>{CourseType}</h3>
                <h4>${price} </h4>
                <p>per hour</p>
                <ul className='Courses__container-features'>
               <li>{Features}</li>
               <li>{Features2}</li>
               <li>{Features3}</li>
               <li>{Features4}</li>
                 
                </ul>
                <Button onClick={AddToBasketHandler} buttonSize='btn--wide' buttonColor='primary'>
                  Add to cart
                </Button>
              </div>
            </Link>
            <Link to='/sign-up' className='Courses__container-card'>
              <div className='Courses__container-cardInfo'>
                <div className='icon'>
                  <BsXDiamondFill />
                </div>
                <h3>System Design Interview</h3>
                <h4>$29.99</h4>
                <p>per hour</p>
                <ul className='Courses__container-features'>
                  <li>Prepare better with us. Get an in-depth 1:1 session.</li>
                  <li>Ideal for senior software engineering role.</li>
                  <li>Get detailed analysis and improve yourself.</li>
                  <li>Test your end to end scalable system design skills.</li>
                  <li>Increase your compensation significantly in 60 mins.</li>
                </ul>
                <Button  buttonSize='btn--wide' buttonColor='blue'>
                Add to cart
                </Button>
              </div>
            </Link>
            <Link to='/sign-up' className='Courses__container-card'>
              <div className='Courses__container-cardInfo'>
                <div className='icon'>
                  <GiCrystalize />
                </div>
                <h3>Program Manager Interview</h3>
                <h4>$99.99</h4>
                <p>per hour</p>
                <ul className='Courses__container-features'>
                  <li>In depth 1-1 program manager interview.</li>
                  <li>Ideal for program/project management role.</li>
                  <li>Demonstrate ability to prioritize competing requests.</li>
                  <li>Focuses on individual skills of program management.</li>
                  <li>Increase your compensation significantly in 45 mins.</li>
                </ul>
                <Button buttonSize='btn--wide' buttonColor='primary'>
                Add to cart
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
        </IconContext.Provider>
   */    }
</>
    )
}

export default CoursesComponent
