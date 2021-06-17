import React from 'react'
import { db,auth } from '../../firebase';
import { useState, useEffect } from 'react';
import Order from './Order';
import './Orders.css'

function Orders() {
//const [{ basket }, dispatch] = useStateValue();
const [orders, setOrders] = useState([]);
    //const { user, setUsername } = useContext(LoginContext);
    //var user = auth.currentUser;
  
    
    
   // console.log(user?.uid);

    useEffect(() => {
      
        var user = localStorage.getItem('LoggedInusername');
         var user_ID = localStorage.getItem('USER_UID');
          console.log("UID in Oredre");
        console.log(user);
        console.log(user_ID);
      if (user) {
          console.log("User is in iF");
        db
        .collection('users')
        .doc(user)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
      } else {
          console.log("User is in Else");



          db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
       // setOrders([])
    }

  }, [])


    console.log(orders);

    return (
        <div>
            <div className='orders'>
            <h1>Your Orders</h1>
            <p>daff</p>
            <div className='orders__order'>
                { orders.length?(orders?.map(order => (
                    <Order order={order} />
                )) ): (<p>Start Placing orders !!!</p>
                 ) }
            </div>
        </div>
        </div>
    )
}

export default Orders
