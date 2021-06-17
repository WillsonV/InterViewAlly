import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  Wrapper: {
    backgroundColor: 'black',
    borderRadius: '10px',
    margin:'10px'
  }
}));

export default function WorkFlow() {
  const classes = useStyles();

  return (
      <>
      <center><h2>How it works</h2></center>
    <Timeline align="alternate" className={classes.Wrapper}>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            1
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <ArrowForwardIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
            Select the Course Track
            </Typography>
            <Typography>Select Quantity as per your needs and go through the payment.</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            2
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <ArrowBackIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              You will get connected by our Team
            </Typography>
            <Typography>We will contact you on email about your target companies, preferred time slots etc. to match you with the best interviewer.</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            3
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary" >
            <ArrowForwardIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Start the Journey 
            </Typography>
            <Typography>. Interviews are conducted online via Skype for voice call, with the help of code-sharing tools.</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            4
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <ArrowBackIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
        
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              FeedBack Time
            </Typography>
            <Typography>Get immediate verbal feedback at the end of the interview.</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
      <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            5
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <ArrowForwardIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
        
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Your Voice
            </Typography>
            <Typography>You are also encouraged to ask whatever questions you have and tips to improve.</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
    </>
  );
}
