
import { BrowserRouter as Router ,Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/pages/HomePage/Home';
import Footer from './components/pages/HomePage/Footer/Footer';
import SignUp from './components/pages/SignUP/SignUp';
import Services from './components/pages/Services/Services';
import SignUpForm from './components/pages/SignUP/SignUpForm';
import Login from './components/pages/Login/Login';
import { LoginContext } from './Contexts/LoginContexts';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import Booking from './components/pages/Bookings/Booking';
import { requireAuth } from './Auths/BookingsAuthValidation';
import CoursesWrapper from './components/courses/CoursesWrapper';
import Cart from './components/Cart/Cart';
import CartWarper from './components/Cart/CartWarper'
import Orders from './components/orders/Orders';
import admin from './components/admin Page/admin';




function App() {

const [username,setUsername]=useState(); 
const [userEmail,setUserEmail]=useState(); 
useEffect(() => {
  // will only run once when the app component loads...
  auth.onAuthStateChanged((authUser) => {
    console.log("THE USER IS >>> ", authUser);

    if (authUser) {
      // the user just logged in / the user was logged in
      setUsername(authUser.email); 
      setUserEmail(authUser.email);
      localStorage.setItem('LoggedInusername', authUser.displayName);
        localStorage.setItem('USER_UID', authUser.uid);
    } else {
      // the user is logged out
      setUsername('');
       localStorage.removeItem('LoggedInusername');
    }
  });
}, []);


  return (
    <LoginContext.Provider value={{username,setUsername}}>
   <Router>
     
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/sign-up" exact component={SignUpForm}/>
      <Route path="/Login" exact component={Login}/>
      <Route path="/services" exact component={Services}/>
      <Route path="/courses" exact component={CoursesWrapper}/>
          <Route path="/Cart" exact component={CartWarper} />
          <Route path="/Orders" exact component={Orders}/>
           <Route path="/admin" exact component={admin}/>
      
      <Route path="/booking" exact component={Booking} onEnter={requireAuth}/>
      
    </Switch>
   <Footer />
   </Router>
   </LoginContext.Provider>

  );
}

export default App;
