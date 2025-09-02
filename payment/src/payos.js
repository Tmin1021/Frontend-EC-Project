const express = require('express')
const PayOS = require('@payos/node')

const payos = new PayOS('client_id', 'api-key', 'checksum-key')
const app = express()
app.use(express.static('public'))
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:3000'
app.post('/create-payment-link', async (req, res) => {
    const order = {
        amount: 10000,
        description: "Thanh toan mi tom",
        orderCode: 10,
        returnUrl: `${YOUR_DOMAIN}/success.html`,
        cancelUrl: `${YOUR_DOMAIN}/cancel.html`
    }
    const paymentLink = await payos.createPaymentLink(order)
    res.redirect(303, paymentLink.checkoutUrl)
})

app.listen(3000, ()=> console.log('running on port 3000'))