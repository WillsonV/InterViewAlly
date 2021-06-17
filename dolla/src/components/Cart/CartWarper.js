import React from 'react'
import Cart from './Cart.js'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe("pk_test_51HQZYoHpBq5C6hEJaPFfNKUQf1kE6zfcgZfQdB9bBu1TqsKQJB5KTUlM2xFJr3T5tfJvOWHdpBa8IlPrkzscPZZZ00yPL4ne0F");

function CartWarper() {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <Cart/>
            </Elements>
        </div>
    )
}

export default CartWarper
