require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



const createCustomer = async(req, res)=>{
    try{

        const {name, email} = req.body;

        const customer = await stripe.customers.create({
            name,
            email
        })

        return res.status(200).json({
            success: true,
            message: customer
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



const addCard = async(req, res)=>{
    try{

        const {
            customer_id,
            card_name,
            card_expYear,
            card_expMonth,
            card_number,
            card_cvc
        } = req.body;

        const card_token = await stripe.tokens.create({
            card:{
                name:card_name,
                number: card_number,
                exp_year:card_expYear,
                exp_month:card_expMonth,
                cvc:card_cvc
            }
        })


        const card = await stripe.customers.createSource(customer_id, {
            source: `${card_token.id}`
        })


        res.status(200).json({
            success: true,
            card: card.id
        })


    }

    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



const createCharges = async(req, res)=>{
    try{

        const create_charge = await stripe.paymentIntents.create({
        receipt_email: 'tester@gmail.com',
        amount: parseInt(req.body.amount)*100 ,// amount*100
        currency: 'INR',
        card: req.body.card_id,
        customer: req.body.customer_id
        })


        res.status(200).json(create_charge)


    }

    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    createCustomer,
    addCard,
    createCharges
}