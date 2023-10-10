const stripe = require("stripe")('sk_test_51KnOM3B4DsFjtDStOnnNt50YvwD25AeUdLII3lljbJeP0ucXLJVNyMKucBkyYwNR58UKX83BlR96h4pliY0E8Joa00ni2DHiMl');


exports.processPayment =  async (req, res) => {
    const { amount } = req.body;
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }