import React from 'react';
import './SignUp.css';
import useForm from './../../../useForm';
import validateInfo from './validateSignUpinfo';
import { Grid } from '@material-ui/core';
import Paper  from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const SignUp = ({ submitForm }) => {
  
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validateInfo
  );


  const useStyles = makeStyles((theme) => ({

   
    root: {
      flexGrow: 1,
      display: 'grid',
      margin:100,
      [theme.breakpoints.down('md')]: {
       margin:0,
       
  
      },
    },
    paper: {
      padding: theme.spacing(2),
      height:520,
      
      color: theme.palette.text.secondary,
    },
    LeftContainer:{ background: 'linear-gradient(90deg,rgb(39, 176, 255) 0,rgb(0, 232, 236) 100)',
    bordeRadius: '10 0 0 10',
    position:'relative',
    height:500,
  },
    formImg: {
     height:408,
     width:408,
      transform: 'translate(-50,-50)',
      justifyContent: 'center',
    },
    formH1:{
      fontSize:'1'+'rem',
    textAlign: 'start',
    width: '80',
    marginBottom: '1',
    color:'#fff',
    marginTop:15,
    },
    FormRight:{
      borderRadius: '0 10px 10px 0',
    position: 'relative',
    minHeight:500,
    background: 'linear-gradient(to right bottom, #282828, #111111)',
  
    },
    form:{
      height: '500',
        transform: 'translate(-50, -50)',
        width: '90',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formInputs:{
      marginLeft:70,
      marginTop:10,
      [theme.breakpoints.down('md')]: {
        margin:20,
        
   
       },
      
    },
    formInputsplaceholder: {
      color: '#595959',
      fontSize: 12,
    },
    FormErrors:{color:'#FF0000'}
  }));
  
    const classes = useStyles();


  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
      <Grid item xs={12} md={6}>
       
          <div style={{background:'linear-gradient(to right bottom, #430089, #82ffa1)'}} className={classes.LeftContainer} >
         <img className={classes.formImg} src='images/img-2.svg' alt='spaceship' />
         </div>

      </Grid>

        <Grid item xs={12} md={6}>
         
          <div className={classes.FormRight} >
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <h1 className={classes.formH1}>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <Grid container spacing={1} >
          <Grid  container className={classes.formInputs} >
              <div >
              <label className={classes.formInputsplaceholder}>Username</label>
              <input
                className='form-input'
                type='text'
                name='username'
                placeholder='Enter your username'
                value={values.username}
                onChange={handleChange}
                size="50"
              />
              {errors.username && <p className={classes.FormErrors}>{errors.username}</p>}
            </div>
          </Grid>
          <Grid  container  className={classes.formInputs}>
                <div >
                <label className={classes.formInputsplaceholder} >Email</label>
                <input
                  className='form-input'
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  value={values.email}
                  onChange={handleChange}
                  size="50"
                />
                {errors.email && <p className={classes.FormErrors}>{errors.email}</p>}
              </div>

          </Grid>
          <Grid  container  className={classes.formInputs}>
              <div >
              <label className={classes.formInputsplaceholder}>Password</label>
              <input
                className='form-input'
                type='password'
                name='password'
                placeholder='Enter your password'
                value={values.password}
                onChange={handleChange}
                size="50"
              />
              {errors.password && <p className={classes.FormErrors}>{errors.password}</p>}
            </div>
             
          </Grid>
          <Grid  container className={classes.formInputs}>
          <div >
          <label className={classes.formInputsplaceholder}>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
            size="50"
          />
          {errors.password2 && <p className={classes.FormErrors}>{errors.password2}</p>}
        </div>

          </Grid>
    
          <Grid  container xs={10} md={6} lg={6} >
          <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Already have an account? Login <a href='#'>here</a>
        </span>
          </Grid>

        </Grid>
       
        
       
       
       
      </form>
    </div>
          

        </Grid>
        
      </Grid>
  



   

    </div>
  );
};

export default SignUp;
