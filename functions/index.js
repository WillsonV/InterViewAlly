// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HQZYoHpBq5C6hEJaq2YTRZVj6LSCOLSOLNxFcathSTJQefHGfFdqrkiuhCPa5CSgekYiKmSgh98kb3FyZylDkAm00e8x6ejUh"
);

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

 

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.get("/willson", (request, response) => response.status(200).send("hello Willson"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  var datetime = new Date();
  console.log("Time -->" + datetime);

  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "INR",
    description: 'Software development services',
    payment_method_types: ['card'],

      
    
  }); 

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});



app.post('/sendOrderSucessMail/create', (req, res) => {
  
  
  const UserName = req.body.User;

  console.log("Re uery ");
  //console.log(req.query);
  console.log(req.body);
    // console.log(req.params);
   console.log('UserName', UserName);
  const Basket = req.body.BasketItems;
  console.log('Bakset Items', Basket);
  var str1 = JSON.stringify(Basket);
   // console.log('Bakset Items atewr striny', str1);
  const basket2 = JSON.parse(str1);
  //console.log('Bakset Items ater parsin', basket2);
   //console.log(typeof(basket2));

 // var t = [...Basket]
  console.log(typeof (basket2));
  


   var x=basket2.reduce((row,nextitem)=>{return row+`<tr style="border-bottom:1px solid #ddd;border-collapse:collapse;border-radius:3px;padding:8px;">
<td colspan=3 style="padding:5px;min-width:400px;"><font face="calibri" size="3"><b>`+nextitem.title+`</b></td>
<td colspan=3 style="padding:5px;min-width:120px;max-width:550px;"><font face="calibri" size="3" ><b>`+nextitem.quantity+`</b></td>
<td colspan=3 style="padding:5px;min-width:120px;max-width:550px;"><font face="calibri" size="3" ><b>`+nextitem.price+`*`+nextitem.quantity+`</b></td></tr>`},'');
  console.log(x);
    console.log(typeof(x));
 //const Mbody=req.body.EventName;
  /*const UserName=req.body.UserName;
 const EventStartTime=req.body.EventStartTime;
 const EventEndTime=req.body.EventEndTime;
  const Organiser = req.body.Organiser;
  */
  

  const toUser="vermawillson@gmail.com";
 const Mbody="InterviewAlly Booking";
 //const UserName="Willson";
 const EventStartTime="eedf";
 const EventEndTime="sfsd";
 const Organiser="Gaurav";


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'walterx00777@gmail.com',
        pass: 'Walter@gmail5'
	}
});

  const output = `<html>
<head>
<title> </title>
</head>
<body link="blue" alink="blue" vlink="red">
<div style="overflow-x:auto;">
<div style="width:100%;min-width:700px;border-radius:4px;">
<div valign='center'>
<table style=" border-collapse:collapse;width:700px;height:50px; ">
<tr>
<td colspan=3 style="padding:8px;"><font face="calibri" size="3">Dear `+ UserName + ` </font></td>
</tr>
<tr>
<td colspan=3 style="padding:8px;"><font face="calibri" size="3">This is to inform you that,you have sucessfully booked the Event : `+ Mbody + `</Font></td>
</tr>
</table>
<table style="width:50%;height:50px;background-color: #fff;border-collapse:collapse;border-radius:6px ;padding:5px;border:10px;" border=1>

 

<tr style="border-bottom:1px solid #ddd;">
<td colspan=3 style="padding:5px;"><font face="calibri" size="2"><b>Course Name</b></font></td>
<td colspan=3 style="padding:5px;word-wrap: break-word;"><font face="calibri" size="3"> Quantity </font></td>
<td colspan=3 style="padding:5px;word-wrap: break-word;"><font face="calibri" size="3"> Price </font></td>
</tr>`+x+`</table>
<br>
<table style=" border-collapse:collapse;width:75%;height:20px; ">
<tr>
<td colspan=3><font face="calibri" size="3">Regards,</font></td>
</tr>
<tr>
<td colspan=3 ><font face="calibri" size="3">InterviewAlly Team</font></td>
</tr>
<tr>
<td><font face="calibri" size="3">Email: <a href="mailto:">/a></font></td>
</tr>
</table>

 

<p><font face="calibri" size="2" color="red"><b>This is a system generated E-mail,please do not reply to this E-mail.</b></Font></p>
<br>
</div>
</div>
</div>
</body>
</html>`;


  // setup email data with unicode symbols
  let mailOptions = {
      from: '"InterviewAlly" <walterx00777@gmail.com>', // sender address
      //to: 'willsonverma17@gmail.com', // list of receivers
      to: toUser, // list of receivers
      subject: Mbody+'', // Subject line
      text: Mbody, // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) { 
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      //res.render('contact', {msg:'Email has been sent'});
      res.send('Email has been sent sucessfully');
  });
  });




// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api
//http://localhost:5001/bookurhour/us-central1/api


