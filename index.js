const express = require('express');
const stripe = require('stripe')('sk_test_51OO2kBSESDTS4BmL5XuvykBc4yYdq2Ho7PaP8wnKJE78RTN5LtSLR1Qtk4IXGTwPnDxNQpbggZPL91f0Q47FBrOF00ZVlQNqvy')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 5000;



// express app
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


// payment route

const payment_route = require('./routes/paymentRoutes');
app.use('/api', payment_route);




app.get('/', (req, res)=>{
    res.send('Hello world')
    res.end()
})



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})