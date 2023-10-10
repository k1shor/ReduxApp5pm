const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51KnOM3B4DsFjtDStOnnNt50YvwD25AeUdLII3lljbJeP0ucXLJVNyMKucBkyYwNR58UKX83BlR96h4pliY0E8Joa00ni2DHiMl');

const paymentRoute = require('./paymentRoute')
app.use(express.static("public"));
app.use(express.json());


app.use(paymentRoute)



app.listen(4242, () => console.log("Node server listening on port 4242!"));