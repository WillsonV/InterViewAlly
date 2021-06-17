import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './payment.css'
import { useState, useReducer, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CartTable from './CartTable';
import './CartTable.css'
import { useSelector } from 'react-redux';
import CurrencyFormat from "react-currency-format";
import { useStripe } from '@stripe/react-stripe-js';
import { useElements } from '@stripe/react-stripe-js';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import './paymentStyle.css'

import axios from '../../Axios/Axios';
import { FaJediOrder } from 'react-icons/fa';
import { auth, db } from '../../firebase';


const stripePromise = loadStripe("pk_test_51HQZYoHpBq5C6hEJaPFfNKUQf1kE6zfcgZfQdB9bBu1TqsKQJB5KTUlM2xFJr3T5tfJvOWHdpBa8IlPrkzscPZZZ00yPL4ne0F");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));


const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);






function Cart() {

   const history = useHistory();
  var user = auth.currentUser;
  console.log("In cart userName>>" );
   console.log(user);

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: ""
  });
  const [clientSecret, setClientSecret] = useState(true);
    const [clientSecret2, setClientSecret2] = useState('Not willson');
  const TotalPrice = useSelector(state => state.total);
   const [succeeded, setSucceeded] = useState(false);
  
  const BasketLength = useSelector(state => state.TotalCartItems);
   const Basket = useSelector(state => state.addedItems);

  console.log("BASKET");
   console.log(Basket);
  
     useEffect(() => {
      // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${TotalPrice * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret().then( ( response ) => {
                setClientSecret(response.data.clientSecret)
            } )
            .catch( () => {
                
            });
      
      
      
      
      const getClientSecret2 = async () => {
            const response = await axios({
                method: 'get',
                // Stripe expects the total in a currencies subunits
                url: `/willson`
            })
            setClientSecret2(response.data)
      }
      getClientSecret2().then( ( response ) => {
               // setClientSecret2(response.data.clientSecret)
            } )
            .catch( () => {
                
            });

    }, [TotalPrice]);

  console.log("The Client Secret Is >>>" + clientSecret);
    console.log("The Client Secret 2 Is >>>" + clientSecret2);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

  


     const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Wilson Rosen',
        },
      }
    });

    console.log("Payment Intent result-->"+result);
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      setError(result.error);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        setPaymentMethod(result.paymentIntent.id);
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.

       // 1) Empty the basket on Sucessful Compleetion of FaJediOrder
        //2) Put orders details into the DB
        //3) Redirect User to Orders Page

        
        db.collection('users')
          .doc(user.displayName)
              .collection('orders')
              .doc(result.paymentIntent.id)
              .set({
                  basket: Basket,
                  amount: result.paymentIntent.amount,
                  created: result.paymentIntent.created
              });
        
        history.replace('/orders');

      

       /* const sendMail = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the total in a currencies subunits
                url: `/sendOrderSucessMail/create?UserName=${user.displayName}`
            })
        }
        */
       let basketStringfied=JSON.stringify(Basket);
      
         const sendMail = async () => {
           const response = await axios.post('/sendOrderSucessMail/create',{ 'User': user.displayName, 'BasketItems': basketStringfied},{
    headers: {
    'Content-Type': 'application/json'
    }
  });
        }

          sendMail().then( ( response ) => {
            console.log("Mail sent SucessFully");
            } )
            .catch( () => {
                
            });


      }
    }

    setProcessing(false);
/*
    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
    }
    */
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: ""
    });
  };
 

    const classes = useStyles();
    return (
        <>
        {/*
        <h1>your cart is empty !! Continue Shopping</h1>
        <div className={classes.root}>
        </div>
        */}
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout
          <Link to="/checkout">{BasketLength} items</Link>
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{/* user?.email */}</p>
            <p>77 React Lane</p>
            <p>JS Lib</p>
            <p>Js,web</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and Delivery</h3>
          </div>
          <div className="payment__items">
          <CartTable/>
        
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Section</h3>
          </div>
                <div className="payment__details">
                  {/*<CheckoutForm /> */} 
                  
                  {paymentMethod ? (
                    <div className="Result">
                      <div className="ResultTitle" role="alert">
                        Payment successful
      </div>
                      <div className="ResultMessage">
                        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod: {paymentMethod.id}
                      </div>
                      <ResetButton onClick={reset} />
                    </div>
                  ) : (
                    <form className="Form" onSubmit={handleSubmit}>
                      <fieldset className="FormGroup">
                        <Field
                          label="Name"
                          id="name"
                          type="text"
                          placeholder="Jane Doe"
                          required
                          autoComplete="name"
                          value={billingDetails.name}
                          onChange={(e) => {
                            setBillingDetails({ ...billingDetails, name: e.target.value });
                          }}
                        />
                        <Field
                          label="Email"
                          id="email"
                          type="email"
                          placeholder="janedoe@gmail.com"
                          required
                          autoComplete="email"
                          value={billingDetails.email}
                          onChange={(e) => {
                            setBillingDetails({ ...billingDetails, email: e.target.value });
                          }}
                        />
                        <Field
                          label="Phone"
                          id="phone"
                          type="tel"
                          placeholder="(941) 555-0123"
                          required
                          autoComplete="tel"
                          value={billingDetails.phone}
                          onChange={(e) => {
                            setBillingDetails({ ...billingDetails, phone: e.target.value });
                          }}
                        />
                      </fieldset>
                      <fieldset className="FormGroup">
                        <CardField
                          onChange={(e) => {
                            setError(e.error);
                            setCardComplete(e.complete);
                          }}
                        />
                      </fieldset>
                      {error && <ErrorMessage>{error.message}</ErrorMessage>}
                      <SubmitButton processing={processing} error={error} disabled={!stripe}>
                        Pay $ {TotalPrice}
                      </SubmitButton>
                    </form>
                  )}
                  
          </div>
        </div>

            
      </div>
    </div>
    <Paper>
    
    </Paper>

        </>
    )
}

export default Cart
