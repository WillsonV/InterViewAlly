import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Button } from './../../Button';
import { useState, useEffect } from 'react';
import  {auth, db}  from '../../../firebase';
import MyBookings from './MyBookings';
import Paper  from '@material-ui/core/Paper';
import BookingsRequests from './BookingsRequests';
import BookingRequets from './BookingRequets';

import { LoginContext } from './../../../Contexts/LoginContexts';
import { useContext } from 'react';
import moment from 'moment';
import BookingRequests2 from './BookingRequests2';
import TransitionsModal from './../../Modals';
import axios from 'axios'



function Booking() {
  const [Events, setEvents] = useState([]);
  const [BookedEventOrgniser, setBookedEventOrgniser] = useState([]);
  const [BookingEventName,setBookingEventName]=useState();
  const [BookingEventDate,setBookingEventDate]=useState();
  const [BookingEventStartTime,setEventStartTime]=useState([]);
  const [BookingEventEndTime,setBookingEventEndTime]=useState([]);

 
  const {username,setUsername}=useContext(LoginContext);



  
const handleChangeEventdate=e=>{
   setBookingEventDate(new Date(e.target.value));
   
  }


  const handleChangeEventName=e=>{
    setBookingEventName(e.target.value);
    if(e.target.value!="" && e.target.value!=undefined)
    {
    db.collection("Events").where("EventName", "==", e.target.value)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           // console.log("Organiser data");
            //console.log(doc.id, " => ", doc.data());
          
            setBookedEventOrgniser(doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    


  }
  
  }

  const handleChangeEventStartTime=e=>{
    setEventStartTime(e.target.value);
    //alert(BookingEventStartTime); 
  }

  const handleChangeEventEndTime=e=>{
    setBookingEventEndTime(e.target.value);
    //alert(BookingEventEndTime); 
  }


  const ProcessBooking = (EventName,StartTime,EndTime,BookingEventDate) => {
    // event.preventDefault();
    <TransitionsModal isopen={true} />
    alert("Your booking details are below -"+ "\nEvent Name-> "+EventName+"\nStart Time->"+moment(StartTime).format("MMM-DD-YYYY HH:mm Z")+"\nEnd Time-> "+EndTime+"->"+"\nBooking date->"+BookingEventDate);
    
   // StartTime=new Date(BookingEventDate.toDateString()+StartTime.toTimeString());
   // alert("StartTime"+"-->"+StartTime);

    let Orgniser={};
    if(EventName!="" && EventName!=undefined)
    {
    /*
    db.collection("Events").where("EventName", "==", EventName)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log("Organiser data");
            console.log(doc.id, " => ", doc.data());
            Orgniser=doc.data();
            console.log(Orgniser.Organiser);
            setBookedEventOrgniser(doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    
*/

  }
   
  //alert("Org--->"+Orgniser);
  //console.log("Org ouutside uf");
  //console.log(Orgniser);
  //alert("Org--->"+BookedEventOrgniser.Organiser);


  if(EventName==undefined ||username==undefined ||StartTime==undefined ||EndTime==undefined || BookedEventOrgniser.Organiser==undefined)
   { alert('Can not the book Event , Please select all fields for Event');
   }
 else
{
  db.collection("Bookings").doc().set({
    BookingStatus: 'Requested',
    EventName:EventName,
    UserName: username,
    StartTime:moment(StartTime).format("MMM DD YYYY HH:mm Z"),
    EndTime:moment(EndTime).format("MMM DD YYYY HH:mm Z"),
    Organiser:BookedEventOrgniser.Organiser,
    Attendee:username,
    EventId:BookedEventOrgniser.EventId,
  


  }).then(() => {
   alert("You have Suceesfully Booked the Event!");
   //older version will be removed
   /*
   axios.post('api/send', {
    firstName: 'Finn',
    lastName: 'Williams'
  })
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });
  */

  var user = auth.currentUser;
  let UserEmail="";
  let UserName1="";

      if (user != null) {
        user.providerData.forEach(function (profile) {
          
          console.log("  Email in Process Booking FunctionS: " + profile.email);
          UserEmail=profile.email;
          UserName1=profile.displayName;
          
        });
      }

  axios.get('/',{})
  .then((response) => {
    alert("tr"+response.data);
  }, (error) => {
    console.log(error);
  });

  axios.post('/send', {
    'EmailId': UserEmail,
    'EventName':EventName,
    'UserName':UserName1,
    'EventStartTime':moment(StartTime).format("MMM DD YYYY HH:mm Z"),
    'EventEndTime':moment(EndTime).format("MMM DD YYYY HH:mm Z"),
    'Organiser':BookedEventOrgniser.Organiser,

    
  })
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error.response.data);
  });



})
.catch((error) => {
   console.error("Error writing document: ", error);
});
}

   
  
     //setComment("");
   };


  /*useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //userlogged out
        setUser(null);
      }
    });

    return () => {
      //perfrom  clean up actions
      unsubscribe();
    };
  }, [user, username]);
  // UseEffect --> Runs a piece of code on a specific condition
  */
 //console.log(username);

  useEffect(() => {
    if(username) 
  {
    db.collection("Events")
      .orderBy("StartTime", "desc")
      .onSnapshot((snapshot) => {
        //every time a new post is added ,this code fires
        setEvents(
          snapshot.docs.map((doc) => ({ EventName: doc.EventName, Organiser: doc.Organiser,StartTime:doc.StartTime,EventData: doc.data() }))
        );
        
      });

      //For calling backend to send Email
    /*
      axios.get('/',{})
      .then((response) => {
        alert("tr"+response.data);
      }, (error) => {
        console.log(error);
      });

      axios.post('/send', {
        'firstName': 'Finn',
        'lastName': 'Williams'
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error.response.data);
      });

      */

  }
}, []);


// Create a query against the collection.
//console.log(username);
if(username) 
{
db.collection("Bookings")
    .where("UserName", "==", username)
    .get()
    .then(snap => {
        snap.forEach(doc => {
            // console.log("firebase user data-->");
           // console.log(doc.data());
        });
    });
}


 // console.log(Events);
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(12),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(5),
      width: 300,
    },
  }));

    const classes = useStyles();


    const useStylesCard = makeStyles((theme) => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //width:500,
        height:500,
        margin: theme.spacing(1),
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',

      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
      Button:{ marginLeft: theme.spacing(18), marginTop: theme.spacing(-10),}
    })); 
    const classesCard= useStylesCard();


    const [age, setAge] = React.useState('');
    
    const useStylesMenu = makeStyles((theme) => ({
      formControl: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: theme.spacing(12),
        marginRight: theme.spacing(1),
        width:300,
        marginTop: theme.spacing(5),
      
      },
    })); 

    const classesMenu= useStylesMenu();
     const handleChange = (event) => {
    setAge(event.target.value);
  };


  const useGridStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginTop:10,
      
    },
    paper2: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderRadius:'4',
      height: 570,
      marginTop:20,
    },
    paperRecentBookings:{
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginBottom:20
    }

  }));

  const Gridclasses = useGridStyles();
  if(username)
  {return (
    <div>
      <div className={Gridclasses.root}>
  <Grid container spacing={3}>

    <Grid item xs={12} md={6}>
      <Paper className={Gridclasses.paper}><p style={{fontWeight: 'bold'}}> Bookings </p>
      <Card className={classesCard.container} variant="outlined">
       <CardContent>
     <form className={classes.container} noValidate onChange={handleChangeEventdate}>
      <TextField
        id="date"
        label="Select the date"
        type="date"
        defaultValue=""
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        
      />
</form>


<FormControl variant="outlined" className={classesMenu.formControl}>
    <InputLabel id="demo-simple-select-outlined-label">Event</InputLabel>
    <Select
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      
      onChange={handleChangeEventName}
      label="Event"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {Events.map((Event)=>( <MenuItem value={Event.EventData.EventName}>{Event.EventData.EventName}</MenuItem>))}
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl>
 
<form className={classes.container} noValidate onChange={handleChangeEventStartTime}>
  <TextField
    id="time"
    label="Time in"
    type="datetime-local"
    defaultValue="07:30"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
  />
</form>

<form className={classes.container} noValidate onChange={handleChangeEventEndTime}>
  <TextField
    id="time"
    label="Time out"
    type="datetime-local"
    defaultValue="07:30"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
  />
</form>
</CardContent>
<CardActions className={classesCard.Button}>
    <Button size="small" onClick={()=>{ProcessBooking(BookingEventName,BookingEventStartTime,BookingEventEndTime,BookingEventDate)}}>Book Now</Button>
  </CardActions>
</Card> 
</Paper>
</Grid>
  <Grid container spacing={3} md={6}>
    <Grid item xs={12} md={12} sm={12}>
      <Paper className={Gridclasses.paper2} variant="outlined"><p style={{fontWeight: 'bold'}}> Booking Requests </p>
     
      <BookingRequests2/>
        
      </Paper>
    </Grid>
    </Grid>

    <Grid container spacing={3} md={12} xs={12}>

    <Grid item xs={12} md={12}>
    
      <Paper className={Gridclasses.paperRecentBookings}><p style={{fontWeight: 'bold',fontSize:'20'}}>  Recent Bookings
      <MyBookings/ > </p></Paper>
      
    </Grid>
    </Grid>
    
  </Grid>
</div>





    </div>
)}
else
{
  return <div><center><h2>Sorry , You need to login first</h2></center></div>
}
    
}

export default Booking
