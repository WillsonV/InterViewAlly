import React, { useEffect, useState,Component } from 'react'
import {MdFingerprint} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {FaBars,FaTimes} from 'react-icons/fa'
import { Button } from './Button';
import './Navbar.css'
import {IconContext}  from 'react-icons/lib'
import { useContext } from 'react';
import { LoginContext } from './../Contexts/LoginContexts';
import { auth } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import  Avatar  from '@material-ui/core/Avatar';
import { useReducer } from 'react';
import { Tooltip } from '@material-ui/core';
import { FaStaylinked,FaShoppingCart } from 'react-icons/fa';
import {useSelector} from 'react-redux'






 function Navbar(props) {

   const counter = useSelector(state => state.counter);

   const TotalCartItems = useSelector(state => state.TotalCartItems);

    const {username,setUsername}=useContext(LoginContext);
    const [click,setClick]=useState(false);
    const [button,setButton]=useState(true);

    const closeMobileMenu=()=>setClick(false);
    const handleClick=()=>setClick(!click);

    const LogOut = () =>
     {  setClick(false);
        if (username) 
        {
          auth.signOut();
          setUsername('');
        }
      };
    
      var user = auth.currentUser;

      if (user != null) {
        user.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
          setUsername(profile.displayName);
        });
      }

    const showButton =()=>
    {
        if(window.innerWidth<=960)
        {
            setButton(false)
        }
        else
        {
            setButton(true)
        }
    }

useEffect(() => {
    showButton();
}, [])

   window.addEventListener('resize',showButton)

   
   const useStyles = makeStyles((theme) => ({
     root: {
       display: 'flex',
       '& > *': {
         marginTop: theme.spacing(2),
         color: 'white',
         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
         
        
       },
       
      [theme.breakpoints.up('xs')]: {
        // backgroundColor: theme.palette.secondary.main,
       
       },

     },

     
   }));
   
   const classes = useStyles();
 function ImageAvatars() {
    
   
     return (
       <div className={classes.root}>
         <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
         <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
         <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
       </div>
     );
   }
   



   
    return (
        <IconContext.Provider value={{color:'#fff'}}>
        <div className="navbar">
          <div className="navbar-container container ">
             <Link to="/"  className="navbar-logo" onClick={closeMobileMenu}>
                 <FaStaylinked className="navbar-icon" />
                 InterviewAlly
             </Link>

            {/* <div><p> {click?<FaTimes/>:<FaBars/>}{username?username:"Guest"}</p></div> */}
             <div className="menu-icon" onClick={handleClick}>
                 {click?<FaTimes/>:<FaBars/>}

             </div>
              
             <ul className={click?'nav-menu active':'nav-menu'}>
                   <li className="nav-item">
                       <Link className="nav-links" to="/" onClick={closeMobileMenu}>Home</Link>
                   </li>
                   <li className="nav-item">
                       <Link className="nav-links" to="/services" onClick={closeMobileMenu}>Services</Link>
                   </li>
                   <li className="nav-item">
                       <Link className="nav-links" to="/courses" onClick={closeMobileMenu}>Courses</Link>
                   </li>
                   <li className="nav-item">
                       <Link className="nav-links" to="/cart" onClick={closeMobileMenu}><FaShoppingCart/><span>{TotalCartItems}</span></Link>
                   </li>
                   {username?( <li className="nav-item">
                       <Link className="nav-links" to="/Login" onClick={LogOut}>Log out</Link>
                   </li>): (<li className="nav-item">
                       <Link className="nav-links" to="/Login" onClick={closeMobileMenu}>Log in</Link>
                   </li>)}

                   {(username!=""  )  && (<li className="nav-item">
                       <Link className="nav-links" to="/booking" onClick={closeMobileMenu}>Bookings</Link>
                   </li>)}

                   

                   { ((username==""  ) && (
                   <li className="nav-btn">
                       {button?(
                          <Link className="btn-link" to='/sign-up'>
                              <Button buttonStyle='btn--outline' >Sign Up</Button></Link> 
                              ):(<Link className='btn-link' to='/sign-up' onClick={closeMobileMenu}><Button buttonStyle='btn--outline' buttonSize='btn--mobile'>SIGN UP</Button></Link>)}
                   </li>
                   ))}


                  <li>{ ((username!="" ) && (
               <div className={classes.root}> <Tooltip title={username}>
              <Avatar alt={username} src="i/h" />
             </Tooltip></div> ))
                 

                 }</li>   

             </ul>
              

              
             
               



              </div>  


        </div>
        </IconContext.Provider>
    )
}



export default Navbar;
