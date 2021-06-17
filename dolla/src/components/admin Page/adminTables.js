import React from 'react'
import moment from "moment";
import './admin.css'


function Admintables({order}) {
    return (
        <div>
             <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
             
           <table id="customers">
          <tbody>
  <tr>
    <th>Item</th>
    <th>Quantity</th>
    <th>Price</th>
     </tr> 


            
                    {order.data.basket?.map(item => (<tr><td>{item.title}</td><td>{item.quantity}</td><td>{item.price}  {(item.quantity > 1) ? ("*"+item.quantity):('')}</td></tr>))}
        
                    
                
         <tr>
    <td>Total</td>
            <td></td>
                        <td>{order.data.amount}</td>
  </tr>
          
    </tbody>
</table>
        </div>
    )
}

export default Admintables
