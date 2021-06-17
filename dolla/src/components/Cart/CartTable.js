import React from 'react'
import GroupedButtons from './GroupedButtons';
import { useSelector } from 'react-redux';

function CartTable() {

  const CartItems = useSelector(state => state.addedItems);
  //console.log(CartItems);
  const NoofCartItems = useSelector(state => state.TotalCartItems);
     const TotalPrice = useSelector(state => state.total);

    return (
        <div>
        <table id="customers">
          <tbody>
  <tr>
    <th>Item</th>
    <th>Quantity</th>
    <th>Price</th>
     </tr>
          {CartItems.map(item => (<tr><td>{item.title}</td><td><GroupedButtons quantity={item.quantity} id={ item.id}/></td><td>{ item.price}</td></tr>))}
    <tr>
    <td>Total</td>
            <td>{NoofCartItems}</td>
            <td>{TotalPrice }</td>
  </tr>
          {/* <tr>
    <td>Coding Interview</td>
    <td><GroupedButtons /></td>
    <td>60</td>
  </tr>
  <tr>
    <td>System Design Interview</td>
    <td><GroupedButtons /></td>
    <td>90</td>
  </tr>
  <tr>
    <td>Coding + System Design Interview</td>
    <td><GroupedButtons /></td>
    <td>180</td>
  </tr>
  <tr>
    <td>Behavioral Interview</td>
    <td><GroupedButtons /></td>
    <td>70</td>
  </tr>
  <tr>
    <td>Object Design Interview</td>
    <td><GroupedButtons /></td>
    <td>80</td>
  </tr>
  <tr>
    <td>Program Manager Interview</td>
    <td><GroupedButtons /></td>
    <td>200</td>
  </tr>
  <tr>
    <td>Total</td>
    <td>1</td>
    <td>2</td>
  </tr>
      */    }
    </tbody>
</table>
        </div>
    )
}

export default CartTable
