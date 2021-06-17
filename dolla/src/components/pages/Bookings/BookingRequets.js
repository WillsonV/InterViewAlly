import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button } from './../../Button';
import { useState, useContext, useEffect } from 'react';
import { LoginContext } from './../../../Contexts/LoginContexts';
import { db } from '../../../firebase';



  

const useRowStyles = makeStyles({
  root: {
    '& > *': {
    
    },
  },
  head: {
    backgroundColor:'black',
    
  },

});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const Button1styles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
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
      border:'none'
    }
  });

  const Button1classes = Button1styles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{ display:'contents' }}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ display:'inline-grid' }} component="th" scope="row">
          {row.Bookings.EventName}
        </TableCell>
        <TableCell style={{ display:'inline-grid' }} align="right">{row.Bookings.Organiser}</TableCell>
        <TableCell style={{ display:'inline-grid' }} align="right">{row.Bookings.StartTime}</TableCell>
        <TableCell style={{ display:'inline-grid' }} align="right">{row.Bookings.EndTime}</TableCell>
        <TableCell style={{ display:'inline-grid' }} align="right">{row.Bookings.BookingStatus}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box marginLeft={0} marginTop={0}>
              <button className={Button1classes.AcceptBtn}>Accept</button>
              <button className={Button1classes.RejectBtn}>Reject</button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
/* 

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];
*/
export default function BookingRequets() {

const [BookingRequests,setBookingRequests]=useState([]);
const {username,setUsername}=useContext(LoginContext);

useEffect(() => {
  if(username)
  {
  db.collection("Bookings")
    .where("UserName", "==", username)
    .onSnapshot((snapshot) => {
      //every time a new post is added ,this code fires
      setBookingRequests(
        snapshot.docs.map((doc) => ({ Bookings: doc.data() }))
      );
    });
  }
}, []);

console.log("Booking Requetss ");
console.log(BookingRequests);

  const TableStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    head: {
      backgroundColor:'black',   
    },
    Headerytext:{color:'white'},
    table: {
      minWidth: 700,  
      minHeight:500,
    }
  
  });

  const TableClass = TableStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className={TableClass.table}>
        <TableHead className={TableClass.head} style = {{color:'white'}}>
          <TableRow >
            <TableCell />
            <TableCell style={{ display:'inline-grid' }}  className={TableClass.Headerytext}>Event</TableCell>
            <TableCell style={{ display:'inline-grid' }}  className={TableClass.Headerytext} align="right">Organiser</TableCell>
            <TableCell style={{ display:'inline-grid' }}  className={TableClass.Headerytext} align="right">Start Time</TableCell>
            <TableCell style={{ display:'inline-grid' }}  className={TableClass.Headerytext} align="right">End Time</TableCell>
            <TableCell style={{ display:'inline-grid' }}  className={TableClass.Headerytext} align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {BookingRequests.map((item) => (
            <Row key={item.Bookings.EventName} row={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
