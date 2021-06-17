import { Paper } from '@material-ui/core'
import React from 'react'
import '.././Cart/CartTable.css'

function Discounts() {
    return (
        <>
        <center>Discounts</center>
      <center>  <div>
        ~ 90% users with 1+ interviews were able to get their dream job
        </div></center>
        <Paper>
        <table id="customers">
           <tr > 
               <td>For orders above 150$ you get 10% off. Use coupon EM150</td></tr>
         <tr><td>For orders above 300$ you get 15% off. Use coupon EM300</td></tr>
         <tr><td>For orders above 500$ you get 20% off. Use coupon EM500</td></tr>
         <tr><td>Are you interested ? Shoot us an email at Hello@interviewally.com</td></tr>

        </table>

        </Paper>
        
        </>
    )
}

export default Discounts
