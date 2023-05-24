const express = require('express')
const app = express()
const currencyApi = 'http://api.coincap.io/v2/rates/'
const request = require('request')

app.get('/currencies', (req, res) => {
    let currencyCode = req.query.currencyCode

    if(!currencyCode) {
        res.statusCode = 400
        res.send('currencyCode is required')
    } else {
        let url = currencyApi + currencyCode.toLowerCase()
        request(url,(err, _, body) => {
            body = JSON.parse(body)
            if (!body.data||err) {
                res.statusCode.code = 404
                res.send('currency not found')
             } else {
                let rate = body.data.rateUsd
                res.json({usd: rate})
             }


        })
    }


})
console.log('server started')
app.listen(3007)