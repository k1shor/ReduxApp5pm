import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./Checkout";
import { create_payment_intent } from "./server";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export default function Payment() {
    const [clientSecret, setClientSecret] = useState("");

    const stripePromise = loadStripe("pk_test_51KnOM3B4DsFjtDStbsKa5pgCM9qwjyq9VsWRynpmqiKc7kgdWN6t1xW0soZRIV71CpBXYPWXHwWxwF2grBRVXkoT00qnJMIo1W");


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    create_payment_intent(1000)
      
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}