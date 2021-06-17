import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';
import  {db}  from '../../../firebase';



function BookingsRequests() {  


const [BookingsData,setBookingsData]=useState([]);

  useEffect(() => {
    db.collection("Bookings")
      .orderBy("StartTime", "desc")
      .onSnapshot((snapshot) => {
        //every time a new post is added ,this code fires
        setBookingsData(
          snapshot.docs.map((doc) => ({ Bookings: doc.data() }))
        );
      });
  }, []);

  console.log(BookingsData);
  //console.log(new Date(BookingsData[0].Bookings.StartTime.seconds * 1000 + BookingsData[0].Bookings.StartTime.nanoseconds/1000000)}); 

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,         
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            
          },
        },
      }))(TableRow);
      
      function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

      {BookingsData.map((item)=>{createData(item.Bookings.EventName,item.Bookings.Organiser,item.Bookings.StartTime,item.Bookings.EndTime,item.Bookings.UserName)})}
      
      const useStyles = makeStyles({
        table: {
          minWidth: 700,
          
          
        },
        
      });
 

      const classes = useStyles();



    return (
        <div>
  <TableContainer component={Paper} style={{ maxHeight: 500 }}>
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Event</StyledTableCell>
          <StyledTableCell align="right">Organiser</StyledTableCell>
          <StyledTableCell align="right">StartTime</StyledTableCell>
          <StyledTableCell align="right">EndTime</StyledTableCell>
          <StyledTableCell align="right">Status</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {BookingsData.map((item) => (
          <StyledTableRow key={item.Bookings.EventId}>
            <StyledTableCell component="th" scope="row">
              {item.Bookings.EventName}
            </StyledTableCell>
            <StyledTableCell align="right">{item.Bookings.Organiser}</StyledTableCell>
            <StyledTableCell align="right">{new Date(item.Bookings.StartTime.seconds*1000+item.Bookings.StartTime.nanoseconds/1000000).toUTCString()}</StyledTableCell>
            <StyledTableCell align="right">{new Date(item.Bookings.EndTime.seconds*1000+item.Bookings.EndTime.nanoseconds/1000000).toUTCString()}</StyledTableCell>
           
            <StyledTableCell align="right">{item.Bookings.UserName}</StyledTableCell>
          </StyledTableRow>
        ))}
     



      </TableBody>
    </Table>
  </TableContainer>


        </div>
    )
}

export default BookingsRequests




















