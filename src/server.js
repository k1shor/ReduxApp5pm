import Stripe from "stripe";


export const create_payment_intent = async amount => {
  
  const stripe = new Stripe('sk_test_51KnOM3B4DsFjtDStOnnNt50YvwD25AeUdLII3lljbJeP0ucXLJVNyMKucBkyYwNR58UKX83BlR96h4pliY0E8Joa00ni2DHiMl');
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount*100,
    currency: "npr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  }
}

