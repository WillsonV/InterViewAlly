import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
//import { auth } from "../../firebase";
import useFormLogin from  './useFormLogin'
import validateInfo from './../SignUP/validateSignUpinfo';
import validateLogin from './ValidateLogin';
import { Grid } from "@material-ui/core";
import Paper  from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { FaStaylinked } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';




function Login() {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  

    const history = useHistory();

    const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { handleChange, handleSubmit, values, errors } = useFormLogin(validateLogin);

  const signIn = (e) => {
    e.preventDefault();
    /*
    //Firebase stuff to login
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
      */
  };


  const register = (e) => {
    e.preventDefault();
    /*
    //Do register from Firebase
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //succesfully cretaed user email and password
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
      */
  };

  return (

    <div className={classes.root}>
    <Grid container spacing={3} justify="center">
      <Grid item xs={12} md={6} lg={6} >
        <Paper className={classes.paper}>
        <div className="login" >
      <Link to="/">
      <IconContext.Provider  value={{ color: 'black', size: '50px' }}>
      <FaStaylinked  className="login__logo" />
      </IconContext.Provider>
      
     
      </Link>
      <div className="login__container">
        <h1>Sign In </h1>
        <form onSubmit={handleSubmit}>
          <h5>Email</h5>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors?.email && <p>{errors.email}</p>}
          
          <h5>Password</h5>
          <input
            type="password"
            name='password'
            placeholder='Enter your password'
            value={values.password}
            //value={password}
           // onChange={(e) => setPassword(e.target.value)}
            onChange={handleChange}
          />
           {errors?.password && <p>password Required</p>}
          <button
            type="submit"
            className="login__signinbutton"
          >
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to BookUrHour Conditions of Use and
          Privacy Notice.
        </p>
        <a path="/SignUP">
        <button className="login__registerbutton" /*onClick={register}*/ onClick={() => history.push('/sign-up')} >
          Create your BookUrHour Account
        </button></a>
      </div>
    </div>
        
        
        
        </Paper>
      </Grid>
   
    </Grid>





    
    </div>
  );
}

export default Login;