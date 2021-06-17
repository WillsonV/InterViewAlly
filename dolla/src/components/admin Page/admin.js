import React from 'react'
import './admin.css'
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import Admintables from './adminTables';

function Admin() {

    const [SearcUserMail, setSearcUserMail] = useState(null);
    const [orders, setOrders] = useState(null);

    function findObjectByLabel(obj, label) {
       for(var elements in obj){
           if (elements === label){
                console.log(obj[elements]);
           }
            if(typeof obj[elements] === 'object'){
            findObjectByLabel(obj[elements], 'title');
           }
          
       }
};


    const SearchUserData = (e) => {
        e.preventDefault();
        const User = document.getElementById('Userinfo').value;
        setSearcUserMail(User);
       // alert(SearcUserMail);
           //alert(User);
    }
    
    alert(SearcUserMail);

    useEffect(() => {
        if (SearcUserMail != null)
            {
            db
                .collection('users')
                .doc(SearcUserMail)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
    }
     },[SearcUserMail])

     
    
    console.log(orders);

    return (
        <div>
            <div className='SearchBar_container'>
            <input className='admin_SearchBar' id='Userinfo' placeholder='Search by Email' type='text' />
                <button className="AdminSearchBtn" onClick={ SearchUserData}>Search </button>
            </div>
             <div>
        <table id="customers">
          <tbody>
  <tr>
    <th>Item</th>
    <th>Quantity</th>
    <th>Price</th>
     </tr>
                        {orders?.map(item => <Admintables order={item} />)}
                        
                
                    
                    
    </tbody>
</table>
        </div> 




        </div>
    )
}

export default Admin
