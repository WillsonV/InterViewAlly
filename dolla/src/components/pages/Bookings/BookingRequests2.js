import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from './../../Button';
import { db } from '../../../firebase';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { LoginContext } from './../../../Contexts/LoginContexts';
import { Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginLeft:10,
    
  },
  AcceptBtn:{
    backgroundColor:'green',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    width: 50,
    height: 30,
    marginLeft:25,
    marginRight:10,
    borderRadius: 2,
    border:'none'
  },
  RejectBtn:{
    backgroundColor:'red',
    background: 'linear-gradient(45deg, #SS6B9B 30%, #FE8E53 90%)',
    width: 50,
    height: 30,
    borderRadius: 2,
    border:'none',
    marginLeft:25,
    marginRight:10,
  }
  
}));

export default function BookingRequests2() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

const [BookingRequests,setBookingRequests]=useState([]);
const {username,setUsername}=useContext(LoginContext);

  useEffect(() => {
    if(username)
    {
    db.collection("Bookings")
      .where("Organiser", "==", username)
      .onSnapshot((snapshot) => {
        //every time a new post is added ,this code fires
        setBookingRequests(
          snapshot.docs.map((doc) => ({ Bookings: doc.data() }))
        );
      });
    }
  }, []);
  
  console.log("Booking Requetss In Accodiadns ");
  console.log(BookingRequests);

 const handleAccept=(EventId)=>
 {
   alert("You are Accpeting this Event Request");

   const ORDER_ITEMS = db.collection("Bookings")

   ORDER_ITEMS.where("EventId", "==", EventId).get().then((snapshots ) => {
  
    if (snapshots.size > 0) {
      snapshots.forEach(orderItem => {
        ORDER_ITEMS.doc(orderItem.id).update({ BookingStatus: 'Accepted' })
      })
    }
   alert("Event Request Accepted");
})
.catch((error) => {
   console.error("Error writing document: ", error);
});

 }

 const handleReject=(EventId)=>
 {
   alert("You are Rejecting this Event Request ")

   const ORDER_ITEMS = db.collection("Bookings")

   ORDER_ITEMS.where("EventId", "==", EventId).get().then((snapshots ) => {
  
    if (snapshots.size > 0) {
      snapshots.forEach(orderItem => {
        ORDER_ITEMS.doc(orderItem.id).update({ BookingStatus: 'Rejected' })
      })
    }
   alert("Event Request Rejected");
})
.catch((error) => {
   console.error("Error writing document: ", error);
});

 }

 if(BookingRequests.length==0)
      {
        return  <div>
           <div>
        <center> <h4 style={{}}>bookings Request for you will show up here</h4></center>
      </div>
           <div className='col'>
          
        <div className=''>
          <center>
          <img style={{marginLeft:200,marginTop:20}} src="images/svg-5.svg" alt="sdd" className='' />
          </center>
        </div>
        </div><div>
        <center> <h4 style={{}}>Start Booking Now</h4></center>
      </div>
      </div>
      }
    else
    {
  return (
    <div className={classes.root}>
         {BookingRequests.map((item) => (
           <Grid item xs={12} md={12} sm={12}>
           <Accordion expanded={expanded ===item.Bookings.EventId} onChange={handleChange(item.Bookings.EventId)}>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1bh-content"
             id="panel1bh-header"
           >
             <Typography className={classes.heading}>{item.Bookings.EventName}</Typography>
             <Grid container xs={8} md={6} sm={12}>
             <Typography className={classes.secondaryHeading}>Organised By You</Typography>
             </Grid>

             <Typography className={classes.secondaryHeading}>  ||  </Typography>
             <Grid item xs={8} md={6} sm={12}>
             <Typography className={classes.secondaryHeading}>Requetsed By  {item.Bookings.Attendee}</Typography>
              </Grid>
              <Grid item xs={8} md={6} sm={12}>
             <Typography className={classes.secondaryHeading}> || Status :  {item.Bookings.BookingStatus}</Typography>
              </Grid>
           </AccordionSummary>
           <AccordionDetails>
             <Typography>
             <span style={{fontWeight:'bold'}}>StartTime : {item.Bookings.StartTime} </span>
             <span style={{fontWeight:'bold',marginLeft:'10px'}}>EndTime : {item.Bookings.StartTime}</span>
             </Typography>
             
           </AccordionDetails>

           {item.Bookings.BookingStatus=='Requested'?( <div><button className={classes.AcceptBtn} onClick={()=>handleAccept(item.Bookings.EventId)}>Accept</button>
             <button className={classes.RejectBtn} onClick={()=>handleReject(item.Bookings.EventId)}>Reject</button> </div>):(item.Bookings.BookingStatus=='Accepted'?(<div>
             <button className={classes.RejectBtn} onClick={()=>handleReject(item.Bookings.EventId)}>Reject</button> </div>):(<div><button className={classes.AcceptBtn} onClick={()=>handleAccept(item.Bookings.EventId)}>Accept</button>
             </div>))}
          
         </Accordion>
         </Grid>
          ))}
   {/*
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>General settings</Typography>
          <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <span style={{fontWeight:'bold'}}>StartTime : </span>
          <span style={{fontWeight:'bold',marginLeft:'10px'}}>EndTime : </span>
          </Typography>
          
        </AccordionDetails>
        <div><button className={classes.AcceptBtn} >Accept</button>
          <button className={classes.RejectBtn}>Reject</button> </div>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Users</Typography>
          <Typography className={classes.secondaryHeading}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Grid>
          <Typography className={classes.heading}>Advanced settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Filtering has been entirely disabled for whole web server
          </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography> 
            SNyud  FGD ddvdvd  dbg gh dDRT TY Er5S, Willson  fd G  , BGtd  F  VFU df f
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
   */}
    </div>
  );
    }
}
